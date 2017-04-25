# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from datetime import datetime
from dateutil import relativedelta
from itertools import groupby
from operator import itemgetter

from odoo import api, fields, models, _
from odoo.addons import decimal_precision as dp
from odoo.addons.procurement.models import procurement
from odoo.exceptions import UserError
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT, pycompat
from odoo.tools.float_utils import float_compare, float_round, float_is_zero


class StockMove(models.Model):
    _name = "stock.move"
    _description = "Stock Move"
    _order = 'picking_id, sequence, id'

    def _default_group_id(self):
        if self.env.context.get('default_picking_id'):
            return self.env['stock.picking'].browse(self.env.context['default_picking_id']).group_id.id
        return False

    name = fields.Char('Description', index=True, required=True)
    sequence = fields.Integer('Sequence', default=10)
    priority = fields.Selection(procurement.PROCUREMENT_PRIORITIES, 'Priority', default='1')
    create_date = fields.Datetime('Creation Date', index=True, readonly=True)
    date = fields.Datetime(
        'Date', default=fields.Datetime.now, index=True, required=True,
        states={'done': [('readonly', True)]},
        help="Move date: scheduled date until move is done, then date of actual move processing")
    company_id = fields.Many2one(
        'res.company', 'Company',
        default=lambda self: self.env['res.company']._company_default_get('stock.move'),
        index=True, required=True)
    date_expected = fields.Datetime(
        'Expected Date', default=fields.Datetime.now, index=True, required=True,
        states={'done': [('readonly', True)]},
        help="Scheduled date for the processing of this move")
    product_id = fields.Many2one(
        'product.product', 'Product',
        domain=[('type', 'in', ['product', 'consu'])], index=True, required=True,
        states={'done': [('readonly', True)]})
    ordered_qty = fields.Float('Ordered Quantity', digits=dp.get_precision('Product Unit of Measure'))
    product_qty = fields.Float(
        'Real Quantity', compute='_compute_product_qty', inverse='_set_product_qty',
        digits=0, store=True,
        help='Quantity in the default UoM of the product')
    product_uom_qty = fields.Float(
        'Quantity',
        digits=dp.get_precision('Product Unit of Measure'),
        default=1.0, required=True, states={'done': [('readonly', True)]},
        help="This is the quantity of products from an inventory "
             "point of view. For moves in the state 'done', this is the "
             "quantity of products that were actually moved. For other "
             "moves, this is the quantity of product that is planned to "
             "be moved. Lowering this quantity does not generate a "
             "backorder. Changing this quantity on assigned moves affects "
             "the product reservation, and should be done with care.")
    product_uom = fields.Many2one(
        'product.uom', 'Unit of Measure', required=True, states={'done': [('readonly', True)]})
    # TDE FIXME: make it stored, otherwise group will not work
    product_tmpl_id = fields.Many2one(
        'product.template', 'Product Template',
        related='product_id.product_tmpl_id',
        help="Technical: used in views")
    product_packaging = fields.Many2one(
        'product.packaging', 'Preferred Packaging',
        help="It specifies attributes of packaging like type, quantity of packaging,etc.")
    location_id = fields.Many2one(
        'stock.location', 'Source Location',
        auto_join=True, index=True, required=True, states={'done': [('readonly', True)]},
        help="Sets a location if you produce at a fixed location. This can be a partner location if you subcontract the manufacturing operations.")
    location_dest_id = fields.Many2one(
        'stock.location', 'Destination Location',
        auto_join=True, index=True, required=True, states={'done': [('readonly', True)]},
        help="Location where the system will stock the finished products.")
    partner_id = fields.Many2one(
        'res.partner', 'Destination Address ',
        states={'done': [('readonly', True)]},
        help="Optional address where goods are to be delivered, specifically used for allotment")
    move_dest_ids = fields.Many2many(
        'stock.move', 'stock_move_move_rel', 'move_orig_id', 'move_dest_id', 'Destination Moves',
        copy=False, index=True,
        help="Optional: next stock move when chaining them")
    move_orig_ids = fields.Many2many(
        'stock.move', 'stock_move_move_rel', 'move_dest_id', 'move_orig_id', 'Original Move',
        help="Optional: previous stock move when chaining them")
    picking_id = fields.Many2one('stock.picking', 'Transfer Reference', index=True, states={'done': [('readonly', True)]})
    picking_partner_id = fields.Many2one('res.partner', 'Transfer Destination Address', related='picking_id.partner_id')
    note = fields.Text('Notes')
    # TODO: state should be computed according to the move lines
    state = fields.Selection([
        ('draft', 'New'), ('cancel', 'Cancelled'),
        ('waiting', 'Waiting Another Move'), ('confirmed', 'Waiting Availability'),
        ('partially_available', 'Partially Available'),
        ('assigned', 'Available'), ('done', 'Done')], string='Status',
        copy=False, default='draft', index=True, readonly=True,
        help="* New: When the stock move is created and not yet confirmed.\n"
             "* Waiting Another Move: This state can be seen when a move is waiting for another one, for example in a chained flow.\n"
             "* Waiting Availability: This state is reached when the procurement resolution is not straight forward. It may need the scheduler to run, a component to be manufactured...\n"
             "* Available: When products are reserved, it is set to \'Available\'.\n"
             "* Done: When the shipment is processed, the state is \'Done\'.")
    price_unit = fields.Float(
        'Unit Price', help="Technical field used to record the product cost set by the user during a picking confirmation (when costing "
                           "method used is 'average price' or 'real'). Value given in company currency and in product uom.")  # as it's a technical field, we intentionally don't provide the digits attribute
    backorder_id = fields.Many2one('stock.picking', 'Back Order of', related='picking_id.backorder_id', index=True)
    origin = fields.Char("Source Document")
    procure_method = fields.Selection([
        ('make_to_stock', 'Default: Take From Stock'),
        ('make_to_order', 'Advanced: Apply Procurement Rules')], string='Supply Method',
        default='make_to_stock', required=True,
        help="By default, the system will take from the stock in the source location and passively wait for availability."
             "The other possibility allows you to directly create a procurement on the source location (and thus ignore "
             "its current stock) to gather products. If we want to chain moves and have this one to wait for the previous,"
             "this second option should be chosen.")
    scrapped = fields.Boolean('Scrapped', related='location_dest_id.scrap_location', readonly=True, store=True)
    remaining_qty = fields.Float(
        'Remaining Quantity', compute='_get_remaining_qty',
        digits=0, states={'done': [('readonly', True)]},
        help="Remaining Quantity in default UoM according to operations matched with this move")
    procurement_id = fields.Many2one('procurement.order', 'Procurement')
    group_id = fields.Many2one('procurement.group', 'Procurement Group', default=_default_group_id)
    rule_id = fields.Many2one('procurement.rule', 'Procurement Rule', ondelete='restrict', help='The procurement rule that created this stock move')
    push_rule_id = fields.Many2one('stock.location.path', 'Push Rule', ondelete='restrict', help='The push rule that created this stock move')
    propagate = fields.Boolean(
        'Propagate cancel and split', default=True,
        help='If checked, when this move is cancelled, cancel the linked move too')
    picking_type_id = fields.Many2one('stock.picking.type', 'Operation Type')
    inventory_id = fields.Many2one('stock.inventory', 'Inventory')
    pack_operation_ids = fields.One2many('stock.pack.operation', 'move_id')
    origin_returned_move_id = fields.Many2one('stock.move', 'Origin return move', copy=False, help='Move that created the return move')
    returned_move_ids = fields.One2many('stock.move', 'origin_returned_move_id', 'All returned moves', help='Optional: all returned moves created from this move')
    reserved_availability = fields.Float(
        'Quantity Reserved', compute='_compute_reserved_availability',
        readonly=True, help='Quantity that has already been reserved for this move')
    availability = fields.Float(
        'Forecasted Quantity', compute='_compute_product_availability',
        readonly=True, help='Quantity in stock that can still be reserved for this move')
    string_availability_info = fields.Text(
        'Availability', compute='_compute_string_qty_information',
        readonly=True, help='Show various information on stock availability for this move')
    restrict_lot_id = fields.Many2one('stock.production.lot', 'Lot/Serial Number', help="Technical field used to depict a restriction on the lot/serial number of quants to consider when marking this move as 'done'")
    restrict_partner_id = fields.Many2one('res.partner', 'Owner ', help="Technical field used to depict a restriction on the ownership of quants to consider when marking this move as 'done'")
    route_ids = fields.Many2many('stock.location.route', 'stock_location_route_move', 'move_id', 'route_id', 'Destination route', help="Preferred route to be followed by the procurement order")
    warehouse_id = fields.Many2one('stock.warehouse', 'Warehouse', help="Technical field depicting the warehouse to consider for the route selection on the next procurement (if any).")
    has_tracking = fields.Selection(related='product_id.tracking', string='Product with Tracking')
    quantity_done = fields.Float('Quantity', compute='_qty_done_compute', digits=dp.get_precision('Product Unit of Measure'))

    @api.one
    @api.depends('product_id', 'product_uom', 'product_uom_qty')
    def _compute_product_qty(self):
        if self.product_uom:
            self.product_qty = self.product_uom._compute_quantity(self.product_uom_qty, self.product_id.uom_id)

    @api.multi
    @api.depends('pack_operation_ids.qty_done')
    def _qty_done_compute(self):
        for move in self:
            move.quantity_done = sum(move.pack_operation_ids.mapped('qty_done'))

    @api.multi
    def _quantity_done_set(self):
        for move in self:
            if move.quantity_done:
                if not move.pack_operation_ids:
                    # do not impact reservation here
                    move_line = self.env['stock.pack.operation'].create(self._prepare_move_line_vals())
                    move.write({'pack_operation_ids': [(4, move_line.id)]})
                elif len(move.pack_operation_ids) == 1:
                    move.pack_operation_ids[0].qty_done = move.quantity_done
                else:
                    raise UserError("blabla")

    def _set_product_qty(self):
        """ The meaning of product_qty field changed lately and is now a functional field computing the quantity
        in the default product UoM. This code has been added to raise an error if a write is made given a value
        for `product_qty`, where the same write should set the `product_uom_qty` field instead, in order to
        detect errors. """
        raise UserError(_('The requested operation cannot be processed because of a programming error setting the `product_qty` field instead of the `product_uom_qty`.'))

    @api.one
    def _get_remaining_qty(self):
        # TODO: sle jco
        pass


    @api.one
    @api.depends('pack_operation_ids.product_qty')
    def _compute_reserved_availability(self):
        """ Fill the `availability` field on a stock move, which is the actual reserved quantity
        and is represented by the aggregated `product_qty` on the linked move lines.
        """
        # FIXME: what should be the value after a force assign?
        self.reserved_availability = sum(self.pack_operation_ids.mapped('product_qty'))

    @api.one
    @api.depends('state', 'product_id', 'product_qty', 'location_id')
    def _compute_product_availability(self):
        """ Fill the `availability` field on a stock move, which is the quantity to potentially
        reserve. When the move is done, `availability` is set to the quantity the move did actually
        move.
        """
        if self.state == 'done':
            self.availability = self.product_qty
        else:
            if self.id:
                # As `get_available_quantity` will perform an sql query directly, do
                # not run it with a virtual id.
                total_availability = self.env['stock.quant'].get_available_quantity(self.product_id, self.location_id)
                self.availability = min(self.product_qty, total_availability)

    @api.multi
    def _compute_string_qty_information(self):
        precision = self.env['decimal.precision'].precision_get('Product Unit of Measure')
        void_moves = self.filtered(lambda move: move.state in ('draft', 'done', 'cancel') or move.location_id.usage != 'internal')
        other_moves = self - void_moves
        for move in void_moves:
            move.string_availability_info = ''  # 'not applicable' or 'n/a' could work too
        for move in other_moves:
            total_available = min(move.product_qty, move.reserved_availability + move.availability)
            total_available = move.product_id.uom_id._compute_quantity(total_available, move.product_uom, round=False)
            total_available = float_round(total_available, precision_digits=precision)
            info = str(total_available)
            if self.user_has_groups('product.group_uom'):
                info += ' ' + move.product_uom.name
            if move.reserved_availability:
                if move.reserved_availability != total_available:
                    # some of the available quantity is assigned and some are available but not reserved
                    reserved_available = move.product_id.uom_id._compute_quantity(move.reserved_availability, move.product_uom, round=False)
                    reserved_available = float_round(reserved_available, precision_digits=precision)
                    info += _(' (%s reserved)') % str(reserved_available)
                else:
                    # all available quantity is assigned
                    info += _(' (reserved)')
            move.string_availability_info = info

    @api.constrains('product_uom')
    def _check_uom(self):
        if any(move.product_id.uom_id.category_id.id != move.product_uom.category_id.id for move in self):
            raise UserError(_('You try to move a product using a UoM that is not compatible with the UoM of the product moved. Please use an UoM in the same UoM category.'))

    @api.model_cr
    def init(self):
        self._cr.execute('SELECT indexname FROM pg_indexes WHERE indexname = %s', ('stock_move_product_location_index',))
        if not self._cr.fetchone():
            self._cr.execute('CREATE INDEX stock_move_product_location_index ON stock_move (product_id, location_id, location_dest_id, company_id, state)')

    @api.multi
    def name_get(self):
        res = []
        for move in self:
            res.append((move.id, '%s%s%s>%s' % (
                move.picking_id.origin and '%s/' % move.picking_id.origin or '',
                move.product_id.code and '%s: ' % move.product_id.code or '',
                move.location_id.name, move.location_dest_id.name)))
        return res

    @api.model
    def create(self, vals):
        # TDE CLEANME: why doing this tracking on picking here ? seems weird
        perform_tracking = not self.env.context.get('mail_notrack') and vals.get('picking_id')
        if perform_tracking:
            picking = self.env['stock.picking'].browse(vals['picking_id'])
            initial_values = {picking.id: {'state': picking.state}}
        vals['ordered_qty'] = vals.get('product_uom_qty')
        res = super(StockMove, self).create(vals)
        if perform_tracking:
            picking.message_track(picking.fields_get(['state']), initial_values)
        return res

    @api.multi
    def write(self, vals):
        # TDE CLEANME: it is a gros bordel + tracking
        Picking = self.env['stock.picking']
        # Check that we do not modify a stock.move which is done
        frozen_fields = ['product_qty', 'product_uom', 'location_id', 'location_dest_id', 'product_id']
        if any(fname in frozen_fields for fname in vals) and any(move.state == 'done' for move in self):
            raise UserError(_('Quantities, Units of Measure, Products and Locations cannot be modified on stock moves that have already been processed (except by the Administrator).'))

        propagated_changes_dict = {}
        #propagation of expected date:
        propagated_date_field = False
        if vals.get('date_expected'):
            #propagate any manual change of the expected date
            propagated_date_field = 'date_expected'
        elif (vals.get('state', '') == 'done' and vals.get('date')):
            #propagate also any delta observed when setting the move as done
            propagated_date_field = 'date'

        if not self._context.get('do_not_propagate', False) and (propagated_date_field or propagated_changes_dict):
            #any propagation is (maybe) needed
            for move in self:
                if move.move_dest_ids and move.propagate:
                    if 'date_expected' in propagated_changes_dict:
                        propagated_changes_dict.pop('date_expected')
                    if propagated_date_field:
                        current_date = datetime.strptime(move.date_expected, DEFAULT_SERVER_DATETIME_FORMAT)
                        new_date = datetime.strptime(vals.get(propagated_date_field), DEFAULT_SERVER_DATETIME_FORMAT)
                        delta = new_date - current_date
                        if abs(delta.days) >= move.company_id.propagation_minimum_delta:
                            old_move_date = datetime.strptime(move.move_dest_id.date_expected, DEFAULT_SERVER_DATETIME_FORMAT)
                            new_move_date = (old_move_date + relativedelta.relativedelta(days=delta.days or 0)).strftime(DEFAULT_SERVER_DATETIME_FORMAT)
                            propagated_changes_dict['date_expected'] = new_move_date
                    #For pushed moves as well as for pulled moves, propagate by recursive call of write().
                    #Note that, for pulled moves we intentionally don't propagate on the procurement.
                    if propagated_changes_dict:
                        move.move_dest_id.write(propagated_changes_dict)
        track_pickings = not self._context.get('mail_notrack') and any(field in vals for field in ['state', 'picking_id', 'partially_available'])
        if track_pickings:
            to_track_picking_ids = set([move.picking_id.id for move in self if move.picking_id])
            if vals.get('picking_id'):
                to_track_picking_ids.add(vals['picking_id'])
            to_track_picking_ids = list(to_track_picking_ids)
            pickings = Picking.browse(to_track_picking_ids)
            initial_values = dict((picking.id, {'state': picking.state}) for picking in pickings)
        res = super(StockMove, self).write(vals)
        if track_pickings:
            pickings.message_track(pickings.fields_get(['state']), initial_values)
        return res

    # Misc tools
    # ------------------------------------------------------------

    def get_price_unit(self):
        """ Returns the unit price to store on the quant """
        return self.price_unit or self.product_id.standard_price

    def _filter_closed_moves(self):
        """ Helper methods when having to avoid working on moves that are
        already done or canceled. In a lot of cases you may handle a batch
        of stock moves, some being already done / canceled, other being still
        under computation. Instead of having to use filtered everywhere and
        forgot some of them, use this tool instead. """
        return self.filtered(lambda move: move.state not in ('done', 'cancel'))


    # Main actions
    # ------------------------------------------------------------

    @api.multi
    def do_unreserve(self):
        if any(move.state in ('done', 'cancel') for move in self):
            raise UserError(_('Cannot unreserve a done move'))
        for move in self:
            if move.state in ('done', 'cancel'):
                raise UserError(_('Cannot unreserve a done move'))
            move.pack_operation_ids.unlink()
            move.state = 'confirmed'  # TODO: should be adapated once MTO/MTS is implemented
        return True

    def _push_apply(self):
        # TDE CLEANME: I am quite sure I already saw this code somewhere ... in routing ??
        Push = self.env['stock.location.path']
        for move in self:
            # if the move is already chained, there is no need to check push rules
            if move.move_dest_ids:
                continue
            # if the move is a returned move, we don't want to check push rules, as returning a returned move is the only decent way
            # to receive goods without triggering the push rules again (which would duplicate chained operations)
            domain = [('location_from_id', '=', move.location_dest_id.id)]
            # priority goes to the route defined on the product and product category
            routes = move.product_id.route_ids | move.product_id.categ_id.total_route_ids
            rules = Push.search(domain + [('route_id', 'in', routes.ids)], order='route_sequence, sequence', limit=1)
            if not rules:
                # TDE FIXME/ should those really be in a if / elif ??
                # then we search on the warehouse if a rule can apply
                if move.warehouse_id:
                    rules = Push.search(domain + [('route_id', 'in', move.warehouse_id.route_ids.ids)], order='route_sequence, sequence', limit=1)
                elif move.picking_id.picking_type_id.warehouse_id:
                    rules = Push.search(domain + [('route_id', 'in', move.picking_id.picking_type_id.warehouse_id.route_ids.ids)], order='route_sequence, sequence', limit=1)
            # Make sure it is not returning the return
            if rules and (not move.origin_returned_move_id or move.origin_returned_move_id.location_dest_id.id != rules.location_dest_id.id):
                rules._apply(move)

    @api.onchange('product_id', 'product_qty')
    def onchange_quantity(self):
        if not self.product_id or self.product_qty < 0.0:
            self.product_qty = 0.0
        if self.product_qty < self._origin.product_qty:
            return {'warning': _("By changing this quantity here, you accept the "
                                 "new quantity as complete: Odoo will not "
                                 "automatically generate a back order.")}

    @api.onchange('product_id')
    def onchange_product_id(self):
        product = self.product_id.with_context(lang=self.partner_id.lang or self.env.user.lang)
        self.name = product.partner_ref
        self.product_uom = product.uom_id.id
        self.product_uom_qty = 1.0
        return {'domain': {'product_uom': [('category_id', '=', product.uom_id.category_id.id)]}}

    @api.onchange('date')
    def onchange_date(self):
        if self.date_expected:
            self.date = self.date_expected

    # TDE DECORATOR: remove that api.multi when action_confirm is migrated
    @api.multi
    def assign_picking(self):
        """ Try to assign the moves to an existing picking that has not been
        reserved yet and has the same procurement group, locations and picking
        type (moves should already have them identical). Otherwise, create a new
        picking to assign them to. """
        Picking = self.env['stock.picking']
        for move in self:
            recompute = False
            picking = Picking.search([
                ('group_id', '=', move.group_id.id),
                ('location_id', '=', move.location_id.id),
                ('location_dest_id', '=', move.location_dest_id.id),
                ('picking_type_id', '=', move.picking_type_id.id),
                ('printed', '=', False),
                ('state', 'in', ['draft', 'confirmed', 'waiting', 'partially_available', 'assigned'])], limit=1)
            if not picking:
                recompute = True
                picking = Picking.create(move._get_new_picking_values())
            move.write({'picking_id': picking.id})

            # If this method is called in batch by a write on a one2many and
            # at some point had to create a picking, some next iterations could
            # try to find back the created picking. As we look for it by searching
            # on some computed fields, we have to force a recompute, else the
            # record won't be found.
            if recompute:
                move.recompute()
        return True
    _picking_assign = assign_picking

    def _get_new_picking_values(self):
        """ Prepares a new picking for this move as it could not be assigned to
        another picking. This method is designed to be inherited. """
        return {
            'origin': self.origin,
            'company_id': self.company_id.id,
            'move_type': self.group_id and self.group_id.move_type or 'direct',
            'partner_id': self.partner_id.id,
            'picking_type_id': self.picking_type_id.id,
            'location_id': self.location_id.id,
            'location_dest_id': self.location_dest_id.id,
        }
    _prepare_picking_assign = _get_new_picking_values

    @api.multi
    def action_confirm(self):
        """ Confirms stock move or put it in waiting if it's linked to another move. """
        move_create_proc = self.env['stock.move']
        move_to_confirm = self.env['stock.move']
        move_waiting = self.env['stock.move']

        to_assign = {}
        self.set_default_price_unit_from_product()
        for move in self:
            # if the move is preceeded, then it's waiting (if preceeding move is done, then action_assign has been called already and its state is already available)
            if move.move_orig_ids:
                move_waiting |= move
            else:
                if move.procure_method == 'make_to_order':
                    move_create_proc |= move
                else:
                    move_to_confirm |= move
            if not move.picking_id and move.picking_type_id:
                key = (move.group_id.id, move.location_id.id, move.location_dest_id.id)
                if key not in to_assign:
                    to_assign[key] = self.env['stock.move']
                to_assign[key] |= move

        # create procurements for make to order moves
        procurements = self.env['procurement.order']
        for move in move_create_proc:
            procurements |= procurements.create(move._prepare_procurement_from_move())
        if procurements:
            procurements.run()

        move_to_confirm.write({'state': 'confirmed'})
        (move_waiting | move_create_proc).write({'state': 'waiting'})

        # assign picking in batch for all confirmed move that share the same details
        for key, moves in pycompat.items(to_assign):
            moves.assign_picking()
        self._push_apply()
        return self

    def _set_default_price_moves(self):
        return self.filtered(lambda move: not move.price_unit)

    def set_default_price_unit_from_product(self):
        """ Set price to move, important in inter-company moves or receipts with only one partner """
        for move in self._set_default_price_moves():
            move.write({'price_unit': move.product_id.standard_price})
    attribute_price = set_default_price_unit_from_product

    def _prepare_procurement_from_move(self):
        self.ensure_one()
        origin = (self.group_id and (self.group_id.name + ":") or "") + (self.rule_id and self.rule_id.name or self.origin or self.picking_id.name or "/")
        group_id = self.group_id and self.group_id.id or False
        if self.rule_id:
            if self.rule_id.group_propagation_option == 'fixed' and self.rule_id.group_id:
                group_id = self.rule_id.group_id.id
            elif self.rule_id.group_propagation_option == 'none':
                group_id = False
        return {
            'name': self.rule_id and self.rule_id.name or "/",
            'origin': origin,
            'company_id': self.company_id.id,
            'date_planned': self.date,
            'product_id': self.product_id.id,
            'product_qty': self.product_uom_qty,
            'product_uom': self.product_uom.id,
            'location_id': self.location_id.id,
            'move_dest_ids': [(4, self.id)],
            'group_id': group_id,
            'route_ids': [(4, x.id) for x in self.route_ids],
            'warehouse_id': self.warehouse_id.id or (self.picking_type_id and self.picking_type_id.warehouse_id.id or False),
            'priority': self.priority,
        }

    @api.multi
    def force_assign(self):
        """ Allow to work on stock move lines even if the reservationis not possible. We just mark
        the move as assigned, so the view does not block the user.
        """
        for move in self.filtered(lambda m: m.state in ['confirmed', 'waiting', 'partially_available', 'assigned']):
            move.write({'state': 'assigned'})

    @api.multi
    def check_tracking(self, pack_operation):
        """ Checks if serial number is assigned to stock move or not and raise an error if it had to. """
        # TDE FIXME: I cannot able to understand
        for move in self:
            if move.picking_id and \
                    (move.picking_id.picking_type_id.use_existing_lots or move.picking_id.picking_type_id.use_create_lots) and \
                    move.product_id.tracking != 'none' and \
                    not (move.restrict_lot_id or (pack_operation and (pack_operation.product_id and pack_operation.pack_lot_ids)) or (pack_operation and not pack_operation.product_id)):
                raise UserError(_('You need to provide a Lot/Serial Number for product %s') % move.product_id.name)

    def _prepare_move_line_vals(self, quantity=None, reserved_quant=None):
        self.ensure_one()

        # apply putaway
        location_dest_id = self.location_dest_id.get_putaway_strategy(self.product_id).id or self.location_dest_id.id
        vals = {
            'move_id': self.id,
            'product_id': self.product_id.id,
            'product_uom_id': self.product_uom.id,
            'location_id': self.location_id.id,
            'location_dest_id': location_dest_id,
            'picking_id': self.picking_id.id,
        }
        if quantity:
            vals = dict(vals, product_qty=quantity)
        if reserved_quant:
            vals = dict(
                vals,
                location_id=reserved_quant.location_id.id,
                lot_id=reserved_quant.lot_id.id or False,
                package_id=reserved_quant.package_id.id or False,
                owner_id =reserved_quant.owner_id.id or False,
            )
        return vals

    @api.multi
    def action_assign(self):
        """ Reserve stock moves by creating their stock move lines. A stock move is 
        considered reserved once the sum of `product_qty` for all its move lines is
        equal to its `product_qty`. If it is less, the stock move is considered
        partially available.
        """
        for move in self.filtered(lambda m: m.state in ['confirmed', 'waiting', 'partially_available']):
            if move.location_id.usage in ('supplier', 'inventory', 'production', 'customer')\
                    or move.product_id.type == 'consu':
                move.write({'state': 'assigned'})
            else:
                if not move.move_orig_ids:
                    if move.procure_method == 'make_to_order':
                        continue
                    # Reserve new quants and create move lines accordingly.
                    available_quantity = self.env['stock.quant'].get_available_quantity(move.product_id, move.location_id)
                    if available_quantity <= 0:
                        continue

                    if available_quantity >= move.product_qty:
                        quants = self.env['stock.quant'].increase_reserved_quantity(move.product_id, move.location_id, move.product_qty)
                        for reserved_quant, quantity in quants:
                            self.env['stock.pack.operation'].create(move._prepare_move_line_vals(quantity=quantity, reserved_quant=reserved_quant))
                        move.write({'state': 'assigned'})
                    else:
                        quants = self.env['stock.quant'].increase_reserved_quantity(move.product_id, move.location_id, available_quantity)
                        for reserved_quant, quantity in quants:
                            self.env['stock.pack.operation'].create(move._prepare_move_line_vals(quantity=quantity, reserved_quant=reserved_quant))
                        move.write({'state': 'partially_available'})
                else:
                    # Check what our parents brought and what our siblings took in order to
                    # determine what we can distribute.
                    move_lines_in = move.move_orig_ids.filtered(lambda m: m.state == 'done').mapped('pack_operation_ids')
                    keys_in = ['location_dest_id', 'lot_id', 'result_package_id', 'owner_id']
                    grouped_move_lines_in = {}
                    for k, g in groupby(sorted(move_lines_in, key=itemgetter(*keys_in)), key=itemgetter(*keys_in)):
                        grouped_move_lines_in[k] = sum(self.env['stock.pack.operation'].concat(*list(g)).mapped('qty_done'))

                    move_lines_out = (move.move_orig_ids.mapped('move_dest_ids') - move)\
                        .filtered(lambda m: m.state in ['partially_available', 'assigned', 'done'])\
                        .mapped('pack_operation_ids')
                    keys_out = ['location_id', 'lot_id', 'package_id', 'owner_id']
                    grouped_move_lines_out = {}
                    for k, g in groupby(sorted(move_lines_out, key=itemgetter(*keys_out)), key=itemgetter(*keys_out)):
                        grouped_move_lines_out[k] = sum(self.env['stock.pack.operation'].concat(*list(g)).mapped('qty_done'))

                    available_move_lines = {key: grouped_move_lines_in[key] - grouped_move_lines_out.get(key, 0) for key in grouped_move_lines_in.keys()}

                    if not available_move_lines:
                        if move.procure_method == 'make_to_order' and move.state == 'waiting':
                            move.state = 'confirmed'  # TODO: starved MTO move handling, implement a fallback
                        continue
                    for (location_id, lot_id, package_id, owner_id), quantity in available_move_lines.items():
                        need = move.product_qty - sum(move.pack_operation_ids.mapped('product_qty'))
                        taken_quantity = min(quantity, need)

                        # Find a candidate move line to update or create a new one.
                        to_update = move.pack_operation_ids.filtered(lambda m: m.location_id.id == location_id.id and m.lot_id.id == lot_id.id\
                                                                     and m.package_id.id == package_id.id and m.owner_id.id == owner_id.id)
                        to_update = to_update and to_update[0] or False
                        if to_update:
                            to_update.product_qty += taken_quantity
                        else:
                            move_line_id = self.env['stock.pack.operation'].create({
                                'move_id': move.id,
                                'picking_id': move.picking_id.id,
                                'product_id': move.product_id.id,
                                'location_dest_id': move.location_dest_id.id,
                                'product_qty': taken_quantity,
                                'location_id': location_id.id,
                                'lot_id': lot_id.id,
                                'package_id': package_id.id,
                                'owner_id': owner_id.id,
                            })
                            move.write({'pack_operation_ids': [(4, move_line_id.id, 0)]})
                        self.env['stock.quant'].increase_reserved_quantity(move.product_id, location_id, taken_quantity)
                        if need - taken_quantity == 0.0:
                            move.state = 'assigned'
                            break
                        if move.state != 'partially_available':
                            move.state = 'partially_available'

    @api.multi
    def action_cancel(self):
        if any(move.state == 'done' for move in self):
            raise UserError(_('You cannot cancel a stock move that has been set to \'Done\'.'))
        for move in self:
            move.do_unreserve()
            if move.propagate:
                move.move_dest_ids.action_cancel()
        self.write({'state': 'cancel', 'move_orig_ids': [(5, 0, 0)]})
        self.mapped('procurement_ids').check()
        return True

    @api.multi
    def _create_extra_move(self):
        """ If the quantity done on a move exceeds its quantity todo, this method will create an
        extra move attached to a (potentially split) move line. If the previous condition is not
        met, it'll return an empty recordset.
        
        The rationale for the creation of an extra move is the application of a potential push
        rule that will handle the extra quantities.
        """
        self.ensure_one()
        extra_move = self.env['stock.move']
        rounding = self.product_uom.rounding
        # moves created after the picking is assigned do not have `product_uom_qty`, but we shouldn't create extra moves for them
        if self.product_uom_qty and float_compare(self.quantity_done, self.product_uom_qty, precision_rounding=rounding) > 0:
            # create the extra moves
            extra_move_quantity = float_round(
                self.quantity_done - self.product_uom_qty,
                precision_rounding=self.product_uom.rounding,
                rounding_method ='UP')
            extra_move_vals = {
                'product_uom_qty': extra_move_quantity,
                'picking_id': self.picking_id.id}
            extra_move = self.copy(default=extra_move_vals).action_confirm()

            # link it to some move lines
            for move_line in self.pack_operation_ids.filtered(lambda ml: ml.qty_done):
                if float_compare(move_line.qty_done, extra_move_quantity, precision_rounding=rounding) <= 0:
                    # move this move line to our extra move
                    move_line.move_id = extra_move.id
                    extra_move_quantity -= move_line.qty_done
                else:
                    # split this move line and assign the new part to our extra move
                    quantity_split = float_round(
                        move_line.qty_done - extra_move_quantity,
                        precision_rounding=self.product_uom.rounding,
                        rounding_method='UP')
                    move_line.qty_done = quantity_split
                    move_line.copy(default={'move_id': extra_move.id, 'qty_done': extra_move_quantity})
                    extra_move_quantity -= extra_move_quantity
                if extra_move_quantity == 0.0:
                    break
        return extra_move

    @api.multi
    def action_done(self):
        moves = self.filtered(lambda x: x.state not in ('done', 'cancel'))
        quant_obj = self.env['stock.quant']
        moves_todo = self.env['stock.move']
        # Create extra moves where necessary
        for move in moves:
            # Here, the `quantity_done` was already rounded to the product UOM by the `do_produce` wizard. However,
            # it is possible that the user changed the value before posting the inventory by a value that should be
            # rounded according to the move's UOM. In this specific case, we chose to round up the value, because it
            # is what is expected by the user (if i consumed/produced a little more, the whole UOM unit should be
            # consumed/produced and the moves are split correctly).
            rounding = move.product_uom.rounding
            move.quantity_done = float_round(move.quantity_done, precision_rounding=rounding, rounding_method ='UP')
            if move.quantity_done <= 0:
                continue
            moves_todo |= move
            moves_todo |= move._create_extra_move()
        # Split moves where necessary and move quants
        for move in moves_todo:
            rounding = move.product_uom.rounding
            if float_compare(move.quantity_done, move.product_uom_qty, precision_rounding=rounding) < 0:
                # Need to do some kind of conversion here
                qty_split = move.product_uom._compute_quantity(move.product_uom_qty - move.quantity_done, move.product_id.uom_id)
                new_move = move.split(qty_split)
                # TODO: Could also split packops maybe -> need to see what to do here
                for ops in move.pack_operation_ids:
                    ops.write({'product_qty': ops.qty_done})
                # On the quants where you need to change the

                #moves_to_backorder.append(new_move)
                # If you were already putting stock.move.lots on the next one in the work order, transfer those to the new move
                move.pack_operation_ids.filtered(lambda x: x.qty_done == 0.0).write({'move_id': new_move})
                self.browse(new_move).quantity_done = 0.0
                nm = self.browse(new_move)
                # FIXME: we should adapt and use the fucking _create_extra_move that will split the move lines
                # correctly, here the qty reserved by the original move is never unreserved
                quant_obj.decrease_reserved_quantity(nm.product_id, nm.location_id, nm.product_qty)
            for packop in move.pack_operation_ids:
                if float_compare(packop.qty_done, 0, precision_rounding=rounding) > 0:
                    if move.has_tracking != 'none' and (move.picking_type_id.use_create_lots or move.picking_type_id.use_existing_lots):
                        if packop.lot_name and not packop.lot_id:
                            lot = self.env['stock.production.lot'].create(
                                {'name': packop.lot_name, 'product_id': packop.product_id.id})
                            packop.write({'lot_id': lot.id})
                        if not packop.lot_id:
                            raise UserError(_('You need to supply a lot/serial number.'))
                    # unreserve TODO
                    if packop.location_id.usage not in ('supplier', 'inventory', 'production', 'customer') and packop.product_qty and packop.product_id.type != 'consu':
                        quant_obj.decrease_reserved_quantity(packop.product_id, packop.location_id, packop.product_qty, lot_id=packop.lot_id, package_id=packop.package_id, owner_id=packop.owner_id)
                    qty = move.product_uom._compute_quantity(packop.qty_done, move.product_id.uom_id)
                    # move DONE
                    if packop.location_id.usage not in ('supplier', 'inventory', 'production', 'customer') and packop.product_id.type != 'consu':
                        quant_obj.decrease_available_quantity(packop.product_id, packop.location_id, qty, lot_id=packop.lot_id, package_id=packop.package_id, owner_id=packop.owner_id)
                    if packop.location_dest_id.usage not in ('supplier', 'inventory', 'production', 'customer') and packop.product_id.type != 'consu':
                        quant_obj.increase_available_quantity(packop.product_id, packop.location_dest_id, qty, lot_id=packop.lot_id, package_id=packop.package_id and packop.package_id or packop.result_package_id, owner_id=packop.owner_id)
        picking = self and self[0].picking_id or False
        moves_todo.write({'state': 'done', 'date': fields.Datetime.now()})
        moves_todo.mapped('move_dest_ids').action_assign()
        if picking:
            moves_to_backorder = picking.move_lines.filtered(lambda x: x.state not in ('done', 'cancel'))
            if moves_to_backorder:
                backorder_picking = picking.copy({
                        'name': '/',
                        'move_lines': [],
                        'pack_operation_ids': [],
                        'backorder_id': picking.id
                    })
                picking.message_post('Backorder Created') #message needs to be improved
                moves_to_backorder.write({'picking_id': backorder_picking.id})
            moves_to_backorder.action_assign()
        return moves_todo

    @api.multi
    def unlink(self):
        if any(move.state not in ('draft', 'cancel') for move in self):
            raise UserError(_('You can only delete draft moves.'))
        return super(StockMove, self).unlink()

    @api.multi
    def split(self, qty, restrict_lot_id=False, restrict_partner_id=False):
        """ Splits qty from move move into a new move

        :param qty: float. quantity to split (given in product UoM)
        :param restrict_lot_id: optional production lot that can be given in order to force the new move to restrict its choice of quants to this lot.
        :param restrict_partner_id: optional partner that can be given in order to force the new move to restrict its choice of quants to the ones belonging to this partner.
        :param context: dictionay. can contains the special key 'source_location_id' in order to force the source location when copying the move
        :returns: id of the backorder move created """
        self = self.with_prefetch() # This makes the ORM only look for one record and not 300 at a time, which improves performance
        if self.state in ('done', 'cancel'):
            raise UserError(_('You cannot split a move done'))
        elif self.state == 'draft':
            # we restrict the split of a draft move because if not confirmed yet, it may be replaced by several other moves in
            # case of phantom bom (with mrp module). And we don't want to deal with this complexity by copying the product that will explode.
            raise UserError(_('You cannot split a draft move. It needs to be confirmed first.'))
        if float_is_zero(qty, precision_rounding=self.product_id.uom_id.rounding) or self.product_qty <= qty:
            return self.id
        # HALF-UP rounding as only rounding errors will be because of propagation of error from default UoM
        uom_qty = self.product_id.uom_id._compute_quantity(qty, self.product_uom, rounding_method='HALF-UP')
        defaults = {
            'product_uom_qty': uom_qty,
            'procure_method': 'make_to_stock',
            'restrict_lot_id': restrict_lot_id,
            'procurement_ids': self.procurement_ids.ids,  # TODO: more logic needed here
            'move_dest_ids': [(4, x.id) for x in self.move_dest_ids if x.state not in ('done', 'cancel')],
            'origin_returned_move_id': self.origin_returned_move_id.id,
        }
        if restrict_partner_id:
            defaults['restrict_partner_id'] = restrict_partner_id

        # TDE CLEANME: remove context key + add as parameter
        if self.env.context.get('source_location_id'):
            defaults['location_id'] = self.env.context['source_location_id']
        new_move = self.copy(defaults)
        # ctx = context.copy()
        # TDE CLEANME: used only in write in this file, to clean
        # ctx['do_not_propagate'] = True
        self.with_context(do_not_propagate=True).write({'product_uom_qty': self.product_uom_qty - uom_qty})

        # if self.move_dest_id and self.propagate and self.move_dest_id.state not in ('done', 'cancel'):
        #     new_move_prop = self.move_dest_id.split(qty)
        #     new_move.write({'move_dest_id': new_move_prop})
        # returning the first element of list returned by action_confirm is ok because we checked it wouldn't be exploded (and
        # thus the result of action_confirm should always be a list of 1 element length)
        new_move.action_confirm()
        # TDE FIXME: due to action confirm change
        return new_move.id

    @api.multi
    def action_show_picking(self):
        view = self.env.ref('stock.view_picking_form')
        return {
            'name': _('Transfer'),
            'type': 'ir.actions.act_window',
            'view_type': 'form',
            'view_mode': 'form',
            'res_model': 'stock.picking',
            'views': [(view.id, 'form')],
            'view_id': view.id,
            'target': 'new',
            'res_id': self.id}
    show_picking = action_show_picking

