odoo.define('website_slides/static/src/tests/activity_tests.js', function (require) {
'use strict';

const { insert } = require('@mail/model/model_field_command');
const {
    afterEach,
    beforeEach,
    createRootMessagingComponent,
    start,
} = require('@mail/utils/test_utils');

QUnit.module('website_slides', {}, function () {
QUnit.module('components', {}, function () {
QUnit.module('activity', {}, function () {
QUnit.module('activity_tests.js', {
    beforeEach() {
        beforeEach(this);
        this.start = async params => {
            const res = await start({ ...params, data: this.data });
            const { afterEvent, components, env, widget } = res;
            this.afterEvent = afterEvent;
            this.components = components;
            this.env = env;
            this.widget = widget;
            return res;
        };
    },
    afterEach() {
        afterEach(this);
    },
});

QUnit.test('grant course access', async function (assert) {
    assert.expect(8);

    this.data['res.partner'].records.push({ id: 11, im_status: 'online' });
    this.data['slide.channel'].records.push({
        id: 100,
        activity_ids: [12],
    });
    this.data['mail.activity'].records.push({
        activity_type_id: 1,
        can_write: true,
        id: 12,
        res_id: 100,
        request_partner_id: 11,
        res_model: 'slide.channel',
    });
    const { createChatterComponent } = await this.start({
        async mockRPC(route, args) {
            if (args.method === 'action_grant_access') {
                assert.strictEqual(args.args.length, 1);
                assert.strictEqual(args.args[0].length, 1);
                assert.strictEqual(args.args[0][0], 100);
                assert.strictEqual(args.kwargs.partner_id, 11);
                assert.step('access_grant');
            }
            return this._super(...arguments);
        },
    });
    await createChatterComponent({
        id: 11,
        threadId: 100,
        threadModel: 'slide.channel',
    });

    assert.containsOnce(document.body, '.o_Activity', "should have activity component");
    assert.containsOnce(document.body, '.o_Activity_grantAccessButton', "should have grant access button");

    document.querySelector('.o_Activity_grantAccessButton').click();
    assert.verifySteps(['access_grant'], "Grant button should trigger the right rpc call");
});

QUnit.test('refuse course access', async function (assert) {
    assert.expect(8);

    this.data['res.partner'].records.push({ id: 11, im_status: 'online' });
    this.data['slide.channel'].records.push({
        id: 100,
        activity_ids: [12],
    });
    this.data['mail.activity'].records.push({
        activity_type_id: 1,
        can_write: true,
        id: 12,
        res_id: 100,
        request_partner_id: 11,
        res_model: 'slide.channel',
    });
    const { createChatterComponent } = await this.start({
        async mockRPC(route, args) {
            if (args.method === 'action_refuse_access') {
                assert.strictEqual(args.args.length, 1);
                assert.strictEqual(args.args[0].length, 1);
                assert.strictEqual(args.args[0][0], 100);
                assert.strictEqual(args.kwargs.partner_id, 11);
                assert.step('access_refuse');
            }
            return this._super(...arguments);
        },
    });
    await createChatterComponent({
        id: 11,
        threadId: 100,
        threadModel: 'slide.channel',
    });

    assert.containsOnce(document.body, '.o_Activity', "should have activity component");
    assert.containsOnce(document.body, '.o_Activity_refuseAccessButton', "should have refuse access button");

    document.querySelector('.o_Activity_refuseAccessButton').click();
    assert.verifySteps(['access_refuse'], "refuse button should trigger the right rpc call");
});

});
});
});

});
