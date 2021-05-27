/** @odoo-module alias=mass_mailing.FieldMassMailingFavoriteFilter.test */

import FormView from 'web.FormView';
import testUtils from 'web.test_utils';

QUnit.module('mass_mailing_favourite_filter', {}, function () {
QUnit.module('favorite filter widget', {
    beforeEach: function () {
        this.data = {
            'mailing.mailing': {
                fields: {
                    display_name: {
                        string: 'Display name',
                        type: 'char',
                    },
                    subject: {
                        string: 'subject',
                        type: 'char',
                    },
                    mailing_model_id: {
                        string: 'Recipients',
                        type: 'many2one',
                        relation: 'ir.model',
                    },
                    mailing_model_name: {
                        string: 'Recipients Model Name',
                        type: 'char',
                    },
                    mailing_filter_id: {
                        string: 'Filters',
                        type: 'many2one',
                        relation: 'mailing.filter',
                    },
                    mailing_domain: {
                        string: 'Domain',
                        type: 'char',
                    },
                    mailing_filter_domain: {
                        string: 'Domain',
                        type: 'char',
                        related: 'mailing_filter_id.mailing_domain',
                    },
                },
                records: [{
                    id: 1,
                    display_name: 'Belgian Event promotion',
                    subject: 'Early bird discount for Belgian Events! Register Now!',
                    mailing_model_id: 1,
                    mailing_model_name: 'event',
                    mailing_domain: '[["country","=","be"]]',
                    mailing_filter_id: 1,
                    mailing_filter_domain: '[["country","=","be"]]',
                }, {
                    id: 2,
                    display_name: 'New Users Promotion',
                    subject: 'Early bird discount for new users! Register Now!',
                    mailing_model_id: 1,
                    mailing_model_name: 'event',
                    mailing_domain: '[["new_user","=",True]]',
                    mailing_filter_domain: '[["new_user","=",True]]',
                }],
            },
            'ir.model': {
                fields: {
                    model: {string: 'Model', type: 'char'},
                },
                records: [{
                    id: 1, name: 'Event', model: 'event',
                }, {
                    id: 2, name: 'Partner', model: 'partner',
                }],
            },
            'mailing.filter': {
                fields: {
                    name: {
                        string: 'Name',
                        type: 'char',
                    },
                    mailing_domain: {
                        string: 'Mailing Domain',
                        type: 'char',
                    },
                    mailing_model_id: {
                        string: 'Recipients Model',
                        type: 'many2one',
                        relation: 'ir.model'
                    },
                },
                records: [{
                    id: 1,
                    name: 'Belgian Events',
                    mailing_domain: '[["country","=","be"]]',
                    mailing_model_id: 1,
                }],
            },
        };
    },

}, function () {

    QUnit.test('create favorite filter', async function (assert) {
        assert.expect(8);

        const form = await testUtils.createView({
            View: FormView,
            model: 'mailing.mailing',
            data: this.data,
            arch: `<form>
                    <field name="display_name"/>
                    <field name="subject"/>
                    <field name="mailing_domain"/>
                    <field name="mailing_model_name" invisible="1"/>
                    <field name="mailing_model_id"/>
                    <field name="mailing_filter_domain" invisible="1"/>
                    <field name="mailing_filter_id"
                        widget="mailing_filter"
                        options="{'no_create': '1', 'no_open': '1', 'domain_field': 'mailing_domain', 'model': 'mailing_model_id'}"/>
                </form>`,
            res_id: 2,
            mockRPC: function (route, args) {
                if (args.method === 'create' && args.model === 'mailing.filter') {
                    assert.deepEqual(args.args,
                        [{mailing_domain: '[["new_user","=",True]]', mailing_model_id: 1, name: 'event promo - new users'}],
                        "should pass correct data in create");
                }
                return this._super.apply(this, arguments);
            },
        });

        await testUtils.form.clickEdit(form);
        const $dropdown = form.$('.o_field_many2one[name="mailing_filter_id"] input').autocomplete('widget');
        assert.isNotVisible(form.$('.o_mass_mailing_remove_filter'),
            "should hide the option to remove filter if no filter is set");
        assert.isVisible(form.$('.o_mass_mailing_save_filter_container'),
            "should have option to save filter if no filter is set");
        await testUtils.dom.click('.o_field_many2one[name="mailing_filter_id"] input');
        assert.containsOnce($dropdown, 'li.ui-menu-item',
            "there should be only one existing filter");
        // create a new filter
        await testUtils.dom.click(form.$('.o_mass_mailing_add_filter'));
        form.el.querySelector('.o_mass_mailing_filter_name').value = 'event promo - new users';
        // Simulate 'Enter' key, which actually 'clicks' the 'o_mass_mailing_btn_save_filter' btn
        await testUtils.fields.triggerKeydown(form.el.querySelector('.o_mass_mailing_filter_name'), 'enter');

        // check if filter is set correctly
        assert.strictEqual(
            form.el.querySelector('.o_field_many2one[name="mailing_filter_id"] input').value,
            'event promo - new users', "saved filter should be set automatically");

        assert.isVisible(form.$('.o_mass_mailing_remove_filter'),
            "should have option to remove filter if filter is already set");
        assert.isNotVisible(form.$('.o_mass_mailing_save_filter_container'),
            "should not have option to save filter if filter is already set");
        await testUtils.dom.click('.o_field_many2one[name="mailing_filter_id"] input');
        assert.containsN($dropdown, 'li.ui-menu-item', 2,
            "there should be two existing filters");
        await testUtils.form.clickSave(form);

        form.destroy();
    });

    QUnit.test('unlink favorite filter', async function (assert) {
        assert.expect(10);

        const form = await testUtils.createView({
            View: FormView,
            model: 'mailing.mailing',
            data: this.data,
            arch: `<form>
                    <field name="display_name"/>
                    <field name="subject"/>
                    <field name="mailing_domain"/>
                    <field name="mailing_model_id"/>
                    <field name="mailing_filter_domain" invisible="1"/>
                    <field name="mailing_filter_id"
                        widget="mailing_filter"
                        options="{'no_create': '1', 'no_open': '1', 'domain_field': 'mailing_domain', 'model': 'mailing_model_id'}"/>
                </form>`,
            res_id: 1,
            mockRPC: function (route, args) {
                if (args.method === 'unlink' && args.model === 'mailing.filter') {
                    assert.strictEqual(args.args[0], 1, "should pass correct filter ID for deletion");
                } else if (args.method === 'write' && args.model === 'mailing.mailing') {
                    assert.strictEqual(args.args[1].mailing_filter_id,
                        false, "filter id should be");
                    assert.strictEqual(args.args[1].mailing_domain,
                        '[["country","=","be"]]', "mailing domain should be retained while unlinking filter");
                }
                return this._super.apply(this, arguments);
            },
        });

        await testUtils.form.clickEdit(form);
        assert.strictEqual(
            form.el.querySelector('.o_field_many2one[name="mailing_filter_id"] input').value,
            'Belgian Events', "there should be filter set");
        assert.isVisible(form.$('.o_mass_mailing_remove_filter'),
            "should have option to remove filter if filter is already set");
        assert.isNotVisible(form.$('.o_mass_mailing_save_filter_container'),
            "should hide the option to save filter if filter is already set");
        // unlink filter
        await testUtils.dom.click(form.$('.o_mass_mailing_remove_filter'));
        assert.strictEqual(
            form.el.querySelector('.o_field_many2one[name="mailing_filter_id"] input').value,
            '', "filter should be empty");
        assert.isNotVisible(form.$('.o_mass_mailing_remove_filter'),
            "should hide the option to remove filter if no filter is set");
        assert.isVisible(form.$('.o_mass_mailing_save_filter_container'),
            "should not hide the option to save filter if no filter is set");
        // check drop-down after filter deletion
        const $dropdown = form.$('.o_field_many2one[name="mailing_filter_id"] input').autocomplete('widget');
        await testUtils.dom.click('.o_field_many2one[name="mailing_filter_id"] input');
        assert.containsNone($dropdown, 'li.ui-menu-item',
            "there should be no available filters");
        await testUtils.form.clickSave(form);

        form.destroy();
    });

    QUnit.test('changing filter correctly applies the domain', async function (assert) {
        assert.expect(2);

        this.data.partner = {
            fields: {
                name: {string: 'Name', type: 'char', searchable: true},
            },
            records: [
                {id: 1, name: 'Azure Interior'},
                {id: 2, name: 'Deco Addict'},
                {id: 3, name: 'Marc Demo'},
            ]
        };

        this.data['mailing.filter'].records = [{
            id: 1,
            name: 'Azure Partner Only',
            mailing_domain: "[['name','=', 'Azure Interior']]",
            mailing_model_id: 2,
        }];

        this.data['mailing.mailing'].records.push({
            id: 3,
            display_name: 'Partner Event promotion',
            subject: 'Early bird discount for Partners!',
            mailing_model_id: 2,
            mailing_model_name: 'partner',
            mailing_domain: "[['name','!=', 'Azure Interior']]",
        });

        this.data['mailing.mailing'].onchanges = {
            mailing_filter_id: obj => {
                obj.mailing_domain = this.data['mailing.filter'].records.filter(r => r.id === obj.mailing_filter_id)[0].mailing_domain;
            },
        };

        const form = await testUtils.createView({
            View: FormView,
            model: 'mailing.mailing',
            data: this.data,
            arch: `<form>
                    <field name="display_name"/>
                    <field name="subject"/>
                    <field name="mailing_model_name" invisible="1"/>
                    <field name="mailing_model_id"/>
                    <field name="mailing_filter_id" widget="mailing_filter" options="{'no_create': '1', 'no_open': '1', 'domain_field': 'mailing_domain', 'model': 'mailing_model_id'}"/>
                    <group>
                        <field name="mailing_domain"
                            widget="domain"
                            options="{'model': 'mailing_model_name'}"/>
                    </group>
                </form>`,
            res_id: 3,
        });

        await testUtils.form.clickEdit(form);
        assert.equal(form.$('.o_domain_show_selection_button').text().trim(), '2 record(s)',
            "default domain should filter 2 records (all but Azure)");

        await testUtils.dom.click('.o_field_many2one[name="mailing_filter_id"] input');
        const $dropdown = form.$('.o_field_many2one[name="mailing_filter_id"] input').autocomplete('widget');
        await testUtils.dom.click($dropdown[0].lastElementChild);
        assert.equal(form.$('.o_domain_show_selection_button').text().trim(), '1 record(s)',
            "applied filter should only display single record (only Azure)");
        await testUtils.form.clickSave(form);

        form.destroy();
    });
});
});
