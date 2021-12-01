# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import base64

from datetime import datetime, timedelta
from freezegun import freeze_time

from odoo.addons.base.tests.common import TransactionCaseWithUserDemo
from odoo.addons.mail.tests.common import mail_new_test_user
from odoo.tests.common import users, warmup
from odoo.tests import tagged
from odoo.tools import mute_logger, formataddr


@tagged('event_performance')
class EventPerformanceCase(TransactionCaseWithUserDemo):

    @classmethod
    def setUpClass(cls):
        super(EventPerformanceCase, cls).setUpClass()

        # Context data: contexts, dates
        # ------------------------------------------------------------

        cls._quick_create_ctx = {
            'no_reset_password': True,
            'mail_create_nolog': True,
            'mail_create_nosubscribe': True,
            'mail_notrack': True,
            'mail_channel_nosubscribe': True,
        }

        # Mock dates to have reproducible computed fields based on time
        cls.reference_now = datetime(2021, 12, 1, 10, 0, 0)
        cls.reference_today = datetime(2021, 12, 1)

        # Users and contacts
        # ------------------------------------------------------------

        cls.admin_user = cls.env.ref('base.user_admin')
        cls.admin_user.write({
            'country_id': cls.env.ref('base.be').id,
            'login': 'admin',
            'notification_type': 'inbox',
        })
        cls.company_admin = cls.admin_user.company_id
        # set country in order to format Belgian numbers
        cls.company_admin.write({
            'country_id': cls.env.ref('base.be').id,
        })
        cls.event_user = mail_new_test_user(
            cls.env,
            company_id=cls.company_admin.id,
            company_ids=[(4, cls.company_admin.id)],
            country_id=cls.env.ref('base.be').id,
            groups='base.group_user,base.group_partner_manager,event.group_event_user',
            email='e.e@example.com',
            login='event_user',
            name='Ernest Employee',
            notification_type='inbox',
            signature='--\nErnest',
        )

        cls.customer = cls.env['res.partner'].with_context(cls._quick_create_ctx).create({
            'country_id': cls.env.ref('base.be').id,
            'email': 'customer.test@example.com',
            'name': 'Test Customer',
            'mobile': '0456123456',
            'phone': '0456123456',
        })

        # Side records for event main records
        # ------------------------------------------------------------

        cls.ticket_product = cls.env['product.product'].create({
            'description_sale': 'Ticket Product Description',
            'detailed_type': 'event',
            'list_price': 10,
            'name': 'Test Registration Product',
            'standard_price': 30.0,
        })
        cls.booth_product = cls.env['product.product'].create({
            'description_sale': 'Booth Product Description',
            'detailed_type': 'event_booth',
            'list_price': 20,
            'name': 'Test Booth Product',
            'standard_price': 60.0,
        })

        cls.tag_categories = cls.env['event.tag.category'].create([
            {'is_published': True, 'name': 'Published Category'},
            {'is_published': False, 'name': 'Unpublished Category'},
        ])
        cls.tags = cls.env['event.tag'].create([
            {'category_id': cls.tag_categories[0].id, 'name': 'PubTag1'},
            {'category_id': cls.tag_categories[0].id, 'color': 0, 'name': 'PubTag2'},
            {'category_id': cls.tag_categories[1].id, 'name': 'UnpubTag1'},
        ])

        cls.event_booth_categories = cls.env['event.booth.category'].create([
            {'description': '<p>Standard</p>',
             'name': 'Standard',
             'product_id': cls.booth_product.id,
            },
            {'description': '<p>Premium</p>',
             'name': 'Premium',
             'product_id': cls.booth_product.id,
            }
        ])

        cls.sponsor_types = cls.env['event.sponsor.type'].create([
            {'name': 'GigaTop',
             'sequence': 1,
            }
        ])
        cls.sponsor_partners = cls.env['res.partner'].create([
            {'country_id': cls.env.ref('base.be').id,
             'email': 'event.sponsor@example.com',
             'name': 'EventSponsor',
             'phone': '04856112233',
            }
        ])

        # Event type
        # ------------------------------------------------------------
        cls.event_type = cls.env['event.type'].create({
            'auto_confirm': True,
            'default_timezone': 'Europe/Paris',
            'event_type_booth_ids': [
                (0, 0, {'booth_category_id': cls.event_booth_categories[0].id,
                        'name': 'Standard Booth',
                       }
                ),
                (0, 0, {'booth_category_id': cls.event_booth_categories[1].id,
                        'name': 'Premium Booth',
                       }
                ),
            ],
            'event_type_mail_ids': [
                (0, 0, {'interval_unit': 'now',  # right at subscription
                        'interval_type': 'after_sub',
                        'template_ref': 'mail.template,%i' % cls.env['ir.model.data']._xmlid_to_res_id('event.event_subscription')
                        }
                ),
                (0, 0, {'interval_nbr': 1,  # 1 days before event
                        'interval_unit': 'days',
                        'interval_type': 'before_event',
                        'template_ref': 'mail.template,%i' % cls.env['ir.model.data']._xmlid_to_res_id('event.event_reminder')
                        }
                ),
            ],
            'event_type_ticket_ids': [
                (0, 0, {'description': 'Ticket1 Description',
                        'name': 'Ticket1',
                        'product_id': cls.ticket_product.id,
                        'seats_max': 30,
                       }
                ),
                (0, 0, {'description': 'Ticket2 Description',
                        'name': 'Ticket2',
                        'product_id': cls.ticket_product.id,
                       }
                )
            ],
            'has_seats_limitation': True,
            'name': 'Test Type',
            'question_ids': [
                (0, 0, {'answer_ids':
                        [(0, 0, {'name': 'Q1-Answer1'}),
                         (0, 0, {'name': 'Q1-Answer2'}),
                        ],
                        'question_type': 'simple_choice',
                        'once_per_order': False,
                        'title': 'Question1',
                       }
                ),
                (0, 0, {'answer_ids':
                        [(0, 0, {'name': 'Q2-Answer1'}),
                         (0, 0, {'name': 'Q2-Answer2'}),
                        ],
                        'question_type': 'simple_choice',
                        'once_per_order': False,
                        'title': 'Question2',
                       }
                ),
                (0, 0, {'question_type': 'text_box',
                        'once_per_order': True,
                        'title': 'Question3',
                       }
                ),
            ],
            'seats_max': 30,
            'tag_ids': [(4, tag.id) for tag in cls.tags],
            'website_menu': True,
        })

        # Website data
        # ------------------------------------------------------------

        cls.website = cls.env['website'].search([
            ('company_id', '=', cls.admin_user.company_id.id)
        ], limit=1)

        cls.website_customer_data = [{
            'name': 'My Customer %02d' % x,
            'partner_id': cls.env.ref('base.public_partner').id,
            'email': 'email.%02d@test.example.com' % x,
            'phone': '04560000%02d' % x,
            # 'registration_answer_ids': [
            #     (0, 0, {
            #         'question_id': cls.event_question_1.id,
            #         'value_answer_id': cls.event_question_1.answer_ids[(x % 2)].id,
            #     }), (0, 0, {
            #         'question_id': cls.event_question_2.id,
            #         'value_answer_id': cls.event_question_2.answer_ids[(x % 2)].id,
            #     }), (0, 0, {
            #         'question_id': cls.event_question_3.id,
            #         'value_text_box': 'CustomerAnswer%s' % x,
            #     })
            # ],
        }  for x in range(0, 4)]

        cls.event_base_vals = {
            'date_begin': cls.reference_now + timedelta(days=1),
            'date_end': cls.reference_now + timedelta(days=4),
            'name': 'Test Event',
        }

    def setUp(self):
        super(EventPerformanceCase, self).setUp()
        # patch registry to simulate a ready environment
        self.patch(self.env.registry, 'ready', True)
        self._init_mail_gateway()
        self._flush_tracking()

    def _init_mail_gateway(self):
        # setup mail gateway
        self.alias_bounce = 'bounce.test'
        self.alias_catchall = 'catchall.test'
        self.alias_domain = 'example.com'
        self.default_from = 'notifications'
        self.env['ir.config_parameter'].set_param('mail.bounce.alias', self.alias_bounce)
        self.env['ir.config_parameter'].set_param('mail.catchall.domain', self.alias_domain)
        self.env['ir.config_parameter'].set_param('mail.catchall.alias', self.alias_catchall)
        self.env['ir.config_parameter'].set_param('mail.default.from', self.default_from)

    def _flush_tracking(self):
        """ Force the creation of tracking values notably, and ensure tests are
        reproducible. """
        self.env['base'].flush()
        self.cr.flush()


@tagged('event_performance')
class TestEventPerformance(EventPerformanceCase):

    @users('admin', 'event_user')
    @warmup
    def test_event_create_single(self):
        """ Test a single event creation """
        event_type = self.env['event.type'].browse(self.event_type.ids)

        with freeze_time(self.reference_now), self.assertQueryCount(admin=72, event_user=72):
            event_values = dict(
                self.event_base_vals,
                event_type_id=event_type.id,
            )
            event = self.env['event.event'].create([event_values])

        print(event.date_begin, event.date_end)

    def test_event_create_batch(self):
        """ Test multiple event creation (import) """
        pass



@tagged('event_performance')
class TestRegistrationPerformance(EventPerformanceCase):

    @classmethod
    def setUpClass(cls):
        super(TestRegistrationPerformance, cls).setUpClass()

        event_values = dict(
            cls.event_base_vals,
            event_type_id=cls.event_type.id,
        )
        cls.test_event = cls.env['event.event'].create(event_values)

    @users('admin', 'event_user')
    @warmup
    def test_registration_create_single(self):
        """ Test a single event creation """
        event = self.env['event.event'].browse(self.test_event.ids)

        with freeze_time(self.reference_now), self.assertQueryCount(admin=41, event_user=45):
            registration_values = dict(
                event_id=event.id,
            )
            registration = self.env['event.registration'].create([registration_values])

        print(registration.event_id.name)

    def test_registration_create_batch(self):
        """ Test multiple event creation (import) """
        pass
