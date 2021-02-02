# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import odoo.tests


class TestUtm(odoo.tests.HttpCase):
    def test_name_generation(self):
        medium_1, medium_2, medium_3, medium_4 = self.env['utm.medium'].create([{
            'name': 'Medium 1',
        }, {
            'name': 'Medium 2',
        }, {
            'name': 'Medium dup',
        }, {
            # Medium 4 has the same name of the previous medium
            'name': 'Medium dup',
        }])

        self.assertEqual(medium_1.name, 'Medium 1')
        self.assertEqual(medium_2.name, 'Medium 2')
        self.assertEqual(medium_3.name, 'Medium dup')

        self.assertNotEqual(medium_4.name, 'Medium dup', 'Name is duplicated')
        self.assertTrue(medium_4.name.startswith('Medium dup ['))

    def test_find_or_create_record(self):
        source_1, source_2 = self.env['utm.source'].create([{
            'name': 'Source 1',
        }, {
            'name': 'Source 2',
        }])

        # Find the record based on the given name
        source = self.env['utm.mixin']._find_or_create_record('utm.source', 'Source 1')
        self.assertEqual(source, source_1)

        # Create a new record
        source_4 = self.env['utm.mixin']._find_or_create_record('utm.source', 'Source 3')
        self.assertNotIn(source_4, source_1 | source_2)
        self.assertEqual(source_4.name, 'Source 3')
