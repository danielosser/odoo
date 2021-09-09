# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from ast import literal_eval

from odoo import api, fields, models, _
from odoo.exceptions import ValidationError, UserError, AccessError

class Project(models.Model):
    _inherit = 'project.project'

    sale_line_id = fields.Many2one(
        'sale.order.line', 'Sales Order Item', copy=False,
        compute="_compute_sale_line_id", store=True, readonly=False, index=True,
        domain="[('is_service', '=', True), ('is_expense', '=', False), ('state', 'in', ['sale', 'done']), ('order_partner_id', '=?', partner_id), '|', ('company_id', '=', False), ('company_id', '=', company_id)]",
        help="Sales order item to which the project is linked. Link the timesheet entry to the sales order item defined on the project. "
        "Only applies on tasks without sale order item defined, and if the employee is not in the 'Employee/Sales Order Item Mapping' of the project.")
    sale_order_id = fields.Many2one(string='Sales Order', related='sale_line_id.order_id', help="Sales order to which the project is linked.")
    has_any_so_to_invoice = fields.Boolean('Has SO to Invoice', compute='_compute_has_any_so_to_invoice')
    sale_order_count = fields.Integer(compute='_compute_sale_order_count')

    @api.model
    def _map_tasks_default_valeus(self, task, project):
        defaults = super()._map_tasks_default_valeus(task, project)
        defaults['sale_line_id'] = False
        return defaults

    @api.depends('partner_id')
    def _compute_sale_line_id(self):
        self.filtered(
            lambda p:
                p.sale_line_id and (
                    not p.partner_id or p.sale_line_id.order_partner_id.commercial_partner_id != p.partner_id.commercial_partner_id
                )
        ).update({'sale_line_id': False})

    @api.depends('sale_order_id.invoice_status', 'tasks.sale_order_id.invoice_status')
    def _compute_has_any_so_to_invoice(self):
        """Has any Sale Order whose invoice_status is set as To Invoice"""
        project_to_invoice = self.env['project.project'].search([
            '|',
                ('sale_order_id.invoice_status', '=', 'to invoice'),
                ('tasks.sale_order_id.invoice_status', '=', 'to invoice'),
            ('id', 'in', self.ids)
        ])
        project_to_invoice.has_any_so_to_invoice = True
        (self - project_to_invoice).has_any_so_to_invoice = False

    def _get_all_sales_orders(self):
        self.ensure_one()
        return self.sale_order_id | self.task_ids.sale_order_id

    @api.depends('sale_order_id', 'task_ids.sale_order_id')
    def _compute_sale_order_count(self):
        for project in self:
            project.sale_order_count = len(project._get_all_sales_orders())

    def action_view_sos(self):
        # Opens all the sales orders linked to the project and the project's tasks
        self.ensure_one()
        all_sale_orders = self._get_all_sales_orders()
        action_window = {
            "type": "ir.actions.act_window",
            "res_model": "sale.order",
            "name": "Sales Orders",
            "context": {"create": False, "show_sale": True},
        }
        if len(all_sale_orders) == 1:
            action_window.update({
                "res_id": self.sale_order_id.id,
                "views": [[False, "form"]],
            })
        else:
            action_window.update({
                "domain": [('id', 'in', all_sale_orders.ids)],
                "views": [[False, "tree"], [False, "kanban"], [False, "calendar"], [False, "pivot"],
                           [False, "graph"], [False, "activity"], [False, "form"]],
            })
        return action_window

    def action_create_invoice(self):
        if not self.has_any_so_to_invoice:
            raise UserError(_("There is nothing to invoice in this project."))
        action = self.env["ir.actions.actions"]._for_xml_id("sale.action_view_sale_advance_payment_inv")
        so_ids = (self.sale_order_id | self.task_ids.sale_order_id).filtered(lambda so: so.invoice_status == 'to invoice').ids
        action['context'] = {
            'active_id': so_ids[0] if len(so_ids) == 1 else False,
            'active_ids': so_ids
        }
        return action

    # ----------------------------
    #  Project Updates
    # ----------------------------

    def _get_stat_buttons(self):
        buttons = super(Project, self)._get_stat_buttons()
        if self.user_has_groups('sales_team.group_sale_salesman_all_leads'):
            buttons.append({
                'icon': 'dollar',
                'text': _('Sales Order'),
                'action_type': 'object',
                'action': 'action_view_so',
                'show': bool(self.sale_order_id),
                'sequence': 1,
            })
        return buttons

class ProjectTask(models.Model):
    _inherit = "project.task"

    sale_order_id = fields.Many2one('sale.order', 'Sales Order', compute='_compute_sale_order_id', store=True, help="Sales order to which the task is linked.")
    sale_line_id = fields.Many2one(
        'sale.order.line', 'Sales Order Item', domain="[('company_id', '=', company_id), ('is_service', '=', True), ('order_partner_id', 'child_of', commercial_partner_id), ('is_expense', '=', False), ('state', 'in', ['sale', 'done'])]",
        compute='_compute_sale_line', recursive=True, store=True, readonly=False, copy=False, tracking=True, index=True,
        help="Sales Order Item to which the time spent on this task will be added, in order to be invoiced to your customer.")
    project_sale_order_id = fields.Many2one('sale.order', string="Project's sale order", related='project_id.sale_order_id')
    invoice_count = fields.Integer("Number of invoices", related='sale_order_id.invoice_count')
    task_to_invoice = fields.Boolean("To invoice", compute='_compute_task_to_invoice', search='_search_task_to_invoice', groups='sales_team.group_sale_salesman_all_leads')
    display_sale_order_id = fields.Boolean(string='Display Sales Order', compute='_compute_display_sale_order_id')

    @property
    def SELF_READABLE_FIELDS(self):
        return super().SELF_READABLE_FIELDS | {'sale_order_id', 'sale_line_id', 'display_sale_order_id'}

    @api.depends('sale_line_id', 'project_id', 'commercial_partner_id')
    def _compute_sale_order_id(self):
        for task in self:
            sale_order_id = task.sale_order_id or self.env["sale.order"]
            if task.sale_line_id:
                sale_order_id = task.sale_line_id.sudo().order_id
            elif task.project_id.sale_order_id:
                sale_order_id = task.project_id.sale_order_id
            if task.commercial_partner_id != sale_order_id.partner_id.commercial_partner_id:
                sale_order_id = False
            if sale_order_id and not task.partner_id:
                task.partner_id = sale_order_id.partner_id
            task.sale_order_id = sale_order_id

    @api.depends('commercial_partner_id', 'sale_line_id.order_partner_id.commercial_partner_id', 'parent_id.sale_line_id', 'project_id.sale_line_id')
    def _compute_sale_line(self):
        for task in self:
            if not task.sale_line_id:
                # if the display_project_id is set then it means the task is classic task or a subtask with another project than its parent.
                task.sale_line_id = task.display_project_id.sale_line_id or task.parent_id.sale_line_id or task.project_id.sale_line_id
            # check sale_line_id and customer are coherent
            if task.sale_line_id.order_partner_id.commercial_partner_id != task.partner_id.commercial_partner_id:
                task.sale_line_id = False

    @api.depends('sale_order_id')
    def _compute_display_sale_order_id(self):
        if not self.sale_order_id:
            self.display_sale_order_id = False
            return
        try:
            sale_orders = self.env['sale.order'].search([('id', 'in', self.sale_order_id.ids)])
            for task in self:
                task.display_sale_order_id = task.sale_order_id and task.sale_order_id in sale_orders
        except AccessError:
            self.display_sale_order_id = False

    @api.constrains('sale_line_id')
    def _check_sale_line_type(self):
        for task in self.sudo():
            if task.sale_line_id:
                if not task.sale_line_id.is_service or task.sale_line_id.is_expense:
                    raise ValidationError(_(
                        'You cannot link the order item %(order_id)s - %(product_id)s to this task because it is a re-invoiced expense.',
                        order_id=task.sale_line_id.order_id.name,
                        product_id=task.sale_line_id.product_id.display_name,
                    ))

    @api.ondelete(at_uninstall=False)
    def _unlink_except_linked_so(self):
        if any(task.sale_line_id for task in self):
            raise ValidationError(_('You have to unlink the task from the sale order item in order to delete it.'))

    # ---------------------------------------------------
    # Actions
    # ---------------------------------------------------

    def _get_action_view_so_ids(self):
        return self.sale_order_id.ids

    def action_view_so(self):
        self.ensure_one()
        if self.env.user.share:
            if not self.display_sale_order_id:
                return {}
            return {
                "name": "Portal Sale Order",
                "type": "ir.actions.act_url",
                "url": "/my/orders/%s" % self.sale_order_id.id,
            }
        # FIXME: I think it is impossible to have many
        so_ids = self._get_action_view_so_ids()
        action_window = {
            "type": "ir.actions.act_window",
            "res_model": "sale.order",
            "name": "Sales Order",
            "views": [[False, "tree"], [False, "kanban"], [False, "form"]],
            "context": {"create": False, "show_sale": True},
            "domain": [["id", "in", so_ids]],
        }
        if len(so_ids) == 1:
            action_window["views"] = [[False, "form"]]
            action_window["res_id"] = so_ids[0]

        return action_window

    def rating_get_partner_id(self):
        partner = self.partner_id or self.sale_line_id.order_id.partner_id
        if partner:
            return partner
        return super().rating_get_partner_id()

    @api.depends('sale_order_id.invoice_status', 'sale_order_id.order_line')
    def _compute_task_to_invoice(self):
        for task in self:
            if task.sale_order_id:
                task.task_to_invoice = bool(task.sale_order_id.invoice_status not in ('no', 'invoiced'))
            else:
                task.task_to_invoice = False

    @api.model
    def _search_task_to_invoice(self, operator, value):
        query = """
            SELECT so.id
            FROM sale_order so
            WHERE so.invoice_status != 'invoiced'
                AND so.invoice_status != 'no'
        """
        operator_new = 'inselect'
        if(bool(operator == '=') ^ bool(value)):
            operator_new = 'not inselect'
        return [('sale_order_id', operator_new, (query, ()))]


class ProjectTaskRecurrence(models.Model):
    _inherit = 'project.task.recurrence'

    def _new_task_values(self, task):
        values = super(ProjectTaskRecurrence, self)._new_task_values(task)
        task = self.sudo().task_ids[0]
        values['sale_line_id'] = self._get_sale_line_id(task)
        return values

    def _get_sale_line_id(self, task):
        return task.sale_line_id.id
