/** @odoo-module */

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { XMLParser, isAttr } from "@web/core/utils/xml";
import { usePager } from "@web/search/pager_hook";
import { useModel } from "@web/views/helpers/model";
import { standardViewProps } from "@web/views/helpers/standard_view_props";
import { useSetupView } from "@web/views/helpers/view_hook";
import { Layout } from "@web/views/layout";
import { getActiveActions, processButton } from "../helpers/view_utils";
import { ListRenderer } from "./list_renderer";
import { RelationalModel } from "../relational_model";
import { useViewButtons } from "@web/views/view_button/hook";
import { Field } from "@web/fields/field";
import { ViewButton } from "@web/views/view_button/view_button";

const { onWillStart, useState, useSubEnv } = owl.hooks;

export class ListViewHeaderButton extends ViewButton {
    onClick() {
        const clickParams = this.props.clickParams;
        const { resModel, resIds } = this.props.record;

        clickParams.buttonContext = {
            active_domain: this.props.domain,
            active_id: resIds[0],
            active_ids: resIds,
            active_model: resModel,
        };

        this.trigger("action-button-clicked", {
            clickParams,
            record: this.props.record,
        });
    }
}

export class GroupListArchParser extends XMLParser {
    parse(arch, fields) {
        const activeFields = {};
        const buttons = [];
        let buttonId = 0;
        this.visitXML(arch, (node) => {
            if (node.tagName === "button") {
                buttons.push({
                    ...processButton(node),
                    id: buttonId++,
                });
            } else if (node.tagName === "field") {
                const fieldInfo = Field.parseFieldNode(node, fields, "list");
                activeFields[fieldInfo.name] = fieldInfo;
            }
        });
        return { activeFields, buttons, fields };
    }
}

export class ListArchParser extends XMLParser {
    parse(arch, fields) {
        const xmlDoc = this.parseXML(arch);
        const activeActions = {
            ...getActiveActions(xmlDoc),
            exportXlsx: isAttr(xmlDoc, "export_xlsx").truthy(true),
        };
        const activeFields = {};
        const columns = [];
        let buttonId = 0;
        const groupBy = {
            buttons: {},
            fields: {},
        };
        let headerButtons = [];
        const groupListArchParser = new GroupListArchParser();
        let buttonGroup = undefined;
        this.visitXML(arch, (node) => {
            if (node.tagName !== "button") {
                buttonGroup = undefined;
            }
            if (node.tagName === "button") {
                const button = {
                    ...processButton(node),
                    defaultRank: "btn-link",
                    type: "button",
                    id: buttonId++,
                };
                if (buttonGroup) {
                    buttonGroup.buttons.push(button);
                } else {
                    buttonGroup = {
                        type: "button_group",
                        buttons: [button],
                    };
                    columns.push(buttonGroup);
                }
            } else if (node.tagName === "field") {
                if (isAttr(node, "invisible").falsy(true)) {
                    const fieldInfo = Field.parseFieldNode(node, fields, "list");
                    activeFields[fieldInfo.name] = fieldInfo;
                    columns.push({
                        ...fieldInfo,
                        optional: node.getAttribute("optional") || false,
                        type: "field",
                    });
                }
            } else if (node.tagName === "groupby" && node.getAttribute("name")) {
                const fieldName = node.getAttribute("name");
                let { arch, fields: groupByFields } = fields[fieldName].views.groupby;
                groupByFields = Object.assign(
                    {
                        id: {
                            change_default: false,
                            company_dependent: false,
                            depends: [],
                            manual: false,
                            name: "id",
                            readonly: true,
                            required: false,
                            searchable: true,
                            sortable: true,
                            store: true,
                            string: "ID",
                            type: "integer",
                        },
                    },
                    groupByFields
                );
                const { activeFields, buttons, fields: parsedFields } = groupListArchParser.parse(
                    arch,
                    groupByFields
                );
                groupBy.buttons[fieldName] = buttons;
                groupBy.fields[fieldName] = { activeFields, fields: parsedFields };
                return false;
            } else if (node.tagName === "header") {
                headerButtons = [...node.children].map((node) => ({
                    ...processButton(node),
                    type: "button",
                    id: buttonId++,
                }));
                return false;
            }
        });

        return { activeActions, headerButtons, fields: activeFields, columns, groupBy };
    }
}

// -----------------------------------------------------------------------------

class ListView extends owl.Component {
    setup() {
        this.actionService = useService("action");
        this.user = useService("user");
        debugger;
        this.archInfo = new ListArchParser().parse(this.props.arch, this.props.fields);
        this.activeActions = this.archInfo.activeActions;
        this.model = useModel(RelationalModel, {
            resModel: this.props.resModel,
            fields: this.props.fields,
            activeFields: this.archInfo.fields,
            viewMode: "list",
            groupByInfo: this.archInfo.groupBy.fields,
        });
        useViewButtons(this.model);

        onWillStart(async () => {
            this.isExportEnable = await this.user.hasGroup("base.group_allow_export");
        });

        this.openRecord = this.openRecord.bind(this);

        useSubEnv({ model: this.model }); // do this in useModel?

        useSetupView({
            /** TODO **/
        });

        usePager(() => {
            return {
                offset: this.model.root.offset,
                limit: this.model.root.limit,
                total: this.model.root.count,
                onUpdate: async ({ offset, limit }) => {
                    this.model.root.offset = offset;
                    this.model.root.limit = limit;
                    await this.model.root.load();
                    this.render();
                },
            };
        });
        this.state = useState({
            selection: [],
        });

        this.toggleSelection = () => {
            if (this.state.selection.length === this.model.root.records.length) {
                this.state.selection = [];
            } else {
                this.state.selection = [...this.model.root.records];
            }
        };

        this.toggleRecordSelection = (record) => {
            const index = this.state.selection.indexOf(record);
            if (index > -1) {
                this.state.selection.splice(index, 1);
            } else {
                this.state.selection.push(record);
            }
        };

        this.getRecords = () => {
            const resModel = this.model.root.resModel;
            let resIds = [];
            if (this.state.selection) {
                resIds = this.state.selection.map((el) => el.resId);
            }
            return {
                resIds,
                resModel,
            };
        };
    }

    openRecord(record) {
        const resIds = this.model.root.records.map((datapoint) => datapoint.resId);
        this.actionService.switchView("form", { resId: record.resId, resIds });
    }

    onClickCreate() {
        this.actionService.switchView("form", { resId: undefined });
    }
}

ListView.type = "list";
ListView.display_name = "List";
ListView.icon = "fa-list-ul";
ListView.multiRecord = true;
ListView.components = { ListViewHeaderButton, ListRenderer, Layout, ViewButton };
ListView.props = {
    ...standardViewProps,
    hasSelectors: { type: Boolean, optional: 1 },
};
ListView.defaultProps = {
    hasSelectors: true,
};

ListView.template = `web.ListView`;
ListView.buttonTemplate = "web.ListView.Buttons";
ListView.ArchParser = ListArchParser;

registry.category("views").add("list", ListView);
