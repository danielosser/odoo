/** @odoo-module */
import * as cpHelpers from "@web/../tests/search/helpers";
import { createWebClient, doAction, loadState } from "@web/../tests/webclient/helpers";
import testUtils from "web.test_utils";
import { registry } from "@web/core/registry";
const actionRegistry = registry.category("actions");
const { Component, mount, tags } = owl;
import { file, dom } from 'web.test_utils';
const { createFile, inputFiles } = file;
const { triggerEvent } = dom;
const FormController = require('web.FormController');
export function getActionManagerServerData() {
    // additional basic client action
    class TestClientAction extends Component { }
    TestClientAction.template = tags.xml`
      <div class="test_client_action">
        ClientAction_<t t-esc="props.action.params?.description"/>
      </div>`;
    actionRegistry.add("__test_project_form__action__", TestClientAction);

    const menus = {
        root: { id: "root", children: [0, 1, 2], name: "root", appID: "root" },
        0: { id: 0, children: [], name: "UglyHack", appID: 0, xmlid: "menu_0" },
        1: { id: 1, children: [], name: "App1", appID: 1, actionID: 1001, xmlid: "menu_1" },
        2: { id: 2, children: [], name: "App2", appID: 2, actionID: 1002, xmlid: "menu_2" },
    };
    const actionsArray = [
        {
            id: 1,
            xml_id: "action_1",
            name: "Partners Action 1",
            res_model: "project",
            type: "ir.actions.act_window",
            views: [[1, "kanban"], [2, "form"]],
        }];
    const actions = {};
    actionsArray.forEach((act) => {
        actions[act.xmlId || act.id] = act;
    });
    const archs = {
        // kanban views
        "project,1,kanban":
            '<kanban><templates><t t-name="kanban-box">' +
            '<div class="oe_kanban_global_click"><field name="foo"/><field name="display_name"/></div>' +
            "</t></templates></kanban>",
        // form views
        "project,2,form":
            "<form js_class=\"project_form\">" +
            "<header>" +
            '<button name="object" string="Call method" type="object"/>' +
            '<button name="4" string="Execute action" type="action"/>' +
            "</header>" +
            "<group>" +
            '<field name="display_name"/>' +
            '<field name="foo"/>' +
            "</group>" +
            "</form>",
        "project,false,search": '<search><field name="foo" string="Foo"/></search>',
    };
    const models = {
        project: {
            fields: {
                id: { string: "Id", type: "integer" },
                foo: { string: "Foo", type: "char" },
            },
            records: [
                { id: 1, display_name: "First record", foo: "test" },
                { id: 3, display_name: "Third record", foo: "test" },
                { id: 4, display_name: "Fourth record", foo: "test" },
                { id: 5, display_name: "Fifth record", foo: "test" },
            ],
        },
    };
    return {
        models,
        views: archs,
        actions,
        menus,
    };
}
let serverData = null;
QUnit.module("Project", hooks => {
    hooks.beforeEach(() => {
        serverData = getActionManagerServerData();
    })
    QUnit.module("Form")
    QUnit.test("oui", async function (assert) {
        assert.expect(0);
        const executeActionDef = testUtils.makeTestPromise();
        /**
         * Small override for test/tour purposes.
         */
        FormController.include({
            async _widgetRenderAndInsert(){
                const _super = this._super.bind(this);
                console.log("widgetRenderAndInsert formController");
                await executeActionDef;
                _super(...arguments);
            }
        });
        const webClient = await createWebClient({ serverData });
        await doAction(webClient, 1);
        // debugger;
        const elName = ".o_kanban_view .o_kanban_record:first";
        // testUtils.dom.click($(webClient.el).find(elName));
        // testUtils.dom.click($(webClient.el).find(elName));
        triggerEvent($(webClient.el).find(elName), "click");
        triggerEvent($(webClient.el).find(elName), "click");
        executeActionDef.resolve();
        await testUtils.nextTick();
        debugger;
        // await cpHelpers.switchView(webClient.el, "kanban");
        // kanban.destroy();
    })
});
