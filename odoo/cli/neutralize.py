# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import logging
import sys

import odoo

from . import Command

_logger = logging.getLogger(__name__)


class Neutralize(Command):
    """neutralize a database"""

    def run(self, args):
        odoo.tools.config.parse_config(args)
        dbname = odoo.tools.config['db_name']
        if not dbname:
            _logger.error('Neutralize command needs a database name. Use "-d" argument')
            sys.exit(1)

        with odoo.api.Environment.manage():
            registry = odoo.registry(dbname)
            _logger.info('Starting database neutralization')
            try:
                with registry.cursor() as cr:
                    env = odoo.api.Environment(cr, odoo.SUPERUSER_ID, {})
                    for model in env.values():
                        model._neutralize()
            except Exception:
                _logger.error('An exception occured during neutralization.')
                raise
            _logger.info('Neutralization finished')
