# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import collections
import itertools
import logging
import random

from odoo.addons.hr.populate import data

from odoo import models
from odoo.tools import populate

_logger = logging.getLogger(__name__)


class HrEmployeePrivate(models.Model):
    _inherit = "hr.employee"

    _populate_dependencies = [
        'res.company',  # MC setup
        'res.users',
        'resource.calendar'
    ]

    _populate_sizes = {
        'small': 40,  # 2+False for each of the 5 companies (as only 10 users)
        'medium': 4_000,  # 1000 users, 10 companies => avg. 3 employees/user
        'large': 40_000,  # 4 employees/user, 800 employees per company
    }

    def _populate_factories(self):
        company_ids = self.env.registry.populated_models['res.company']
        admin_id = self.env.ref('base.user_admin').id
        user_ids = [*filter(lambda uid: uid != admin_id,
                            self.env.registry.populated_models['res.users'])]
        user_ids_to_sample = [False] + user_ids
        # todo: check whether there is another way to not fail unit testing
        #  checking this function alone
        #  (odoo.addons.test_populate.tests.test_populate:118)
        n_employees_per_company = int(4 * len(user_ids)
                                      / max(1, len(company_ids)))

        user_factories_by_company = [
            [
                ('company_id', populate.iterate([company_id])),
                ('user_id', populate.iterate(
                    random.sample(user_ids_to_sample,
                                  n_employees_per_company)))
            ] for company_id in company_ids
        ]

        def _compute_user_and_company(iterator, *args):
            generators = [
                populate.chain_factories(users_factory, self._name)
                for users_factory in user_factories_by_company
            ]
            for generator in generators:
                for new_values in generator:
                    if new_values['__complete']:
                        break
                    values = next(iterator)
                    yield {**values, **new_values}

            # Then, as many as required non-users
            for values, company_id in zip(
                    iterator, itertools.cycle(company_ids)):
                yield {'company_id': company_id,
                       'user_id': False,
                       **values}

        def get_resource_calendar_id(values, random, **kwargs):
            return random.choice(
                self.env['resource.calendar']
                    .search([('company_id', '=', values['company_id'])])
            ).id

        return [
            ('name', populate.iterate(['Mr. {counter}', 'Ms. {counter}'])),
            ('_user_and_company', _compute_user_and_company),
            ('employee_type', populate.iterate(
                *zip(*data.employee_types_weighted.items()))),
            ('work_phone', populate.iterate(data.work_phones)),
            ('resource_calendar_id', populate.compute(
                get_resource_calendar_id)),
        ]

    def _populate(self, size):
        employees = super()._populate(size)
        _logger.info("Updating users company_ids")
        users_companies = collections.defaultdict(list)
        for employee in employees:
            users_companies[employee.user_id.id].append(employee.company_id.id)
        for user_id, company_ids in users_companies.items():
            self.env["res.users"].write({
                "id":          user_id,
                "company_ids": company_ids
            })
        return employees
