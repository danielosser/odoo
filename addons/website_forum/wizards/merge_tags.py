# -*- coding: utf-8 -*-
from odoo import models, api, fields
from nltk.stem import WordNetLemmatizer

class MergeTagsWizard(models.TransientModel):

    _name = 'forum.tag.merge_tags'
    _description = 'Merge Tag Wizard'
    
    tag_ids = fields.Many2many('forum.tag', default=lambda self: self.env['forum.tag'].search([]))
    line_ids = fields.One2many(comodel_name='forum.tag.merge_tags_line', inverse_name='wizard_id', compute='_compute_line_ids')

    @api.depends('tag_ids')
    def _compute_line_ids(self):
        for record in self:

            tags_by_lemma = {}
            for tag in record.tag_ids:
                name = tag.name
                lemma = WordNetLemmatizer().lemmatize(name, pos="v")
                if lemma not in tags_by_lemma:
                    tags_by_lemma[lemma] = tag
                else:
                    tags_by_lemma[lemma] += tag

            lines = self.env['forum.tag.merge_tags_line']

            for lemma, tags in tags_by_lemma.items():
                if len(tags) > 1:
                    lines |= self.env['forum.tag.merge_tags_line'].create({
                            'name':lemma,
                            'wizard_id':record.id,
                            'tag_ids':[(6, 0, tags.ids)],
                        })

            record.line_ids = lines



    class MergeTagsLine(models.TransientModel):
        _name = 'forum.tag.merge_tags_line'
        _description = 'Merge Tag Line'

        @api.depends('tag_ids')
        def _default_get_master(self):
            for record in self:
                record.master_id = record.tag_ids[0]
                for tag in record.tag_ids:
                    if tag.name == record.name:
                        record.master_id = tag

        name = fields.Char(string="Base Name")
        wizard_id = fields.Many2one(comodel_name='forum.tag.merge_tags')
        tag_ids = fields.Many2many('forum.tag')
        master_id = fields.Many2one('forum.tag', compute='_default_get_master')


        @api.multi
        def merge_ligne(self):
            self.ensure_one()
            posts_to_write = self.env["forum.post"]
            for tag in self.tag_ids:
                if tag != self.master_id:
                    posts = self.env["forum.post"].search([('tag_ids', 'in', tag.id)])
                    posts_to_write |= posts
                    tag.unlink()
            posts_to_write.write({'tag_ids': [(4, self.master_id.id)]})


class MergeTagsManuallyWizard(models.TransientModel):

    _name = 'forum.tag.merge_tags_manually'
    _description = 'Merge Tag Manually Wizard'

    @api.depends('tag_ids')
    def _default_get_master(self):
        for record in self:
            return record.tag_ids[0]

    master_id = fields.Many2one('forum.tag', default=_default_get_master)
    tag_ids = fields.Many2many('forum.tag', default=lambda self: self._context.get('active_ids'))


    @api.multi
    def merge(self):
        self.ensure_one()
        posts_to_write = self.env["forum.post"]
        for tag in self.tag_ids:
            if tag != self.master_id:
                posts = self.env["forum.post"].search([('tag_ids', 'in', tag.id)])
                posts_to_write |= posts
                tag.unlink()
        posts_to_write.write({'tag_ids': [(4, self.master_id.id)]})