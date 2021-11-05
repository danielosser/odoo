/** @odoo-module **/

import { registry } from "@web/core/registry";
import { combineAttributes, isAttr, XMLParser } from "@web/core/utils/xml";
import { useModel } from "@web/views/helpers/model";
import { standardViewProps } from "@web/views/helpers/standard_view_props";
import { useSetupView } from "@web/views/helpers/view_hook";
import { getActiveActions, processField } from "@web/views/helpers/view_utils";
import { KanbanDynamicGroupList } from "@web/views/kanban/kanban_datapoints";
import { KanbanRenderer } from "@web/views/kanban/kanban_renderer";
import { Layout } from "@web/views/layout";
import { RelationalModel } from "@web/views/relational_model";
import { useViewButtons } from "@web/views/view_button/hook";

const KANBAN_BOX_ATTRIBUTE = "kanban-box";
const ACTION_TYPES = ["action", "object"];
const SPECIAL_TYPES = [...ACTION_TYPES, "edit", "open", "delete", "url", "set_cover"];
const TRANSPILED_EXPRESSIONS = [
    // Action names
    { regex: /\bwidget.editable\b/g, value: "props.info.activeActions.edit" },
    { regex: /\bwidget.deletable\b/g, value: "props.info.activeActions.delete" },
    // `widget.prop` => `props.prop`
    { regex: /\bwidget\.(\w+)\b/g, value: "props.$1" },
    // `record.prop` => `record.data.prop`
    { regex: /\brecord\.(\w+)\b/g, value: "record.data.$1" },
    // `prop.raw_value` => `prop`
    { regex: /(\w+)\.(raw_)?value\b/g, value: "$1" },
    // `#{expr}` => `{{expr}}`
    { regex: /#{([^}]+)}/g, value: "{{$1}}" },
];
// These classes determine whether a click on a record should open it.
const KANBAN_CLICK_CLASSES = ["oe_kanban_global_click", "oe_kanban_global_click_edit"];

const hasClass = (node, ...classes) => {
    const classAttribute = node.getAttribute("class") || "";
    const attfClassAttribute = node.getAttribute("t-attf-class") || "";
    const nodeClasses = [
        ...classAttribute.split(/\s+/),
        ...attfClassAttribute.replace(/{{[^}]+}}/g, "").split(/\s+/),
    ];
    return classes.some((cls) => nodeClasses.includes(cls));
};

const translateAttribute = (attrValue) => {
    for (const { regex, value } of TRANSPILED_EXPRESSIONS) {
        attrValue = attrValue.replace(regex, value);
    }
    return attrValue;
};

const applyDefaultAttributes = (kanbanBox) => {
    kanbanBox.setAttribute("tabindex", 0);
    kanbanBox.setAttribute("role", "article");
    kanbanBox.setAttribute("t-att-data-id", "recordsDraggable and record.id");
    if (hasClass(kanbanBox, ...KANBAN_CLICK_CLASSES)) {
        kanbanBox.setAttribute("t-on-click", "onCardClicked(record)");
    }
    combineAttributes(kanbanBox, "class", "o_kanban_record");
    return kanbanBox;
};

const extractAttributes = (node, attributes) => {
    const attrs = Object.create(null);
    for (const rawAttr of attributes) {
        const attr = rawAttr.replace(/-([a-z])/gi, (_, c) => c.toUpperCase());
        attrs[attr] = node.getAttribute(rawAttr) || "";
        node.removeAttribute(rawAttr);
    }
    return attrs;
};

export class KanbanArchParser extends XMLParser {
    parse(arch, fields) {
        const xmlDoc = this.parseXML(arch);
        const className = xmlDoc.getAttribute("class") || null;
        const defaultGroupBy = xmlDoc.getAttribute("default_group_by");
        const limit = xmlDoc.getAttribute("limit");
        const recordsDraggable = isAttr(xmlDoc, "records_draggable").truthy(true);
        const activeActions = {
            ...getActiveActions(xmlDoc),
            groupArchive: isAttr(xmlDoc, "archivable").truthy(true),
            groupCreate: isAttr(xmlDoc, "group_create").truthy(true),
            groupDelete: isAttr(xmlDoc, "group_delete").truthy(true),
            groupEdit: isAttr(xmlDoc, "group_edit").truthy(true),
        };
        const quickCreate =
            activeActions.create &&
            isAttr(xmlDoc, "quick_create").truthy(true) &&
            isAttr(xmlDoc, "on_create").equalTo("quick_create");
        const tooltips = {};
        let kanbanBoxTemplate = document.createElement("t");
        let colorField = "color";
        const activeFields = {};

        // Root level of the template
        this.visitXML(xmlDoc, (node) => {
            if (node.getAttribute("t-name") === KANBAN_BOX_ATTRIBUTE) {
                kanbanBoxTemplate = node;
                return;
            }
            // Case: field node
            if (node.tagName === "field") {
                const fieldInfo = processField(node, fields, "kanban");
                const name = fieldInfo.name;
                activeFields[name] = fieldInfo;
                Object.assign(tooltips, fieldInfo.options.group_by_tooltip);
                if (fieldInfo.widget) {
                    combineAttributes(node, "class", "oe_kanban_action");
                } else {
                    // Fields without a specified widget are rendered as simple
                    // spans in kanban records.
                    const tesc = document.createElement("span");
                    const value = `record.data['${name}']`;
                    tesc.setAttribute(
                        "t-esc",
                        `(Array.isArray(${value}) ? ${value}[1] : ${value}) or ''`
                    );
                    node.replaceWith(tesc);
                }
            }
            // Converts server qweb attributes to Owl attributes.
            for (const { name, value } of node.attributes) {
                node.setAttribute(name, translateAttribute(value));
            }
        });

        // Concrete kanban box element in the template
        const kanbanBox =
            [...kanbanBoxTemplate.children].find((node) => node.tagName === "div") ||
            kanbanBoxTemplate;

        // Generates dropdown element
        const dropdown = document.createElement("t");
        const togglerClass = [];
        const menuClass = [];
        const transfers = [];
        let progressBarInfo = false;
        let dropdownInserted = false;
        dropdown.setAttribute("t-component", "Dropdown");

        // Progressbar
        for (const el of xmlDoc.getElementsByTagName("progressbar")) {
            const attrs = extractAttributes(el, ["field", "colors", "sum_field", "help"]);
            progressBarInfo = {
                fieldName: attrs.field,
                colors: JSON.parse(attrs.colors),
                sumField: attrs.sum_field || false,
                help: attrs.help,
            };
            kanbanBox.setAttribute("t-att-class", "getRecordProgressColor(groupOrRecord)");
        }

        // Dropdown element
        for (const el of kanbanBox.getElementsByClassName("dropdown")) {
            const classes = el
                .getAttribute("class")
                .split(/\s+/)
                .filter((cls) => cls && cls !== "dropdown");
            combineAttributes(dropdown, "class", classes);
            if (!dropdownInserted) {
                transfers.push(() => el.replaceWith(dropdown));
                dropdownInserted = true;
            }
        }

        // Dropdown menu content
        for (const el of kanbanBox.getElementsByClassName("dropdown-menu")) {
            menuClass.push(el.getAttribute("class"));
            dropdown.append(...el.children);
            if (dropdownInserted) {
                transfers.push(() => el.remove());
            } else {
                transfers.push(() => el.replaceWith(dropdown));
                dropdownInserted = true;
            }
        }

        // Dropdown toggler content
        for (const el of kanbanBox.querySelectorAll(
            ".dropdown-toggle,.o_kanban_manage_toggle_button"
        )) {
            togglerClass.push(el.getAttribute("class"));
            const togglerSlot = document.createElement("t");
            togglerSlot.setAttribute("t-set-slot", "toggler");
            togglerSlot.append(...el.children);
            dropdown.appendChild(togglerSlot);
            if (dropdownInserted) {
                transfers.push(() => el.remove());
            } else {
                transfers.push(() => el.replaceWith(dropdown));
                dropdownInserted = true;
            }
        }

        transfers.forEach((transfer) => transfer());

        // Color picker
        for (const el of kanbanBox.getElementsByClassName("oe_kanban_colorpicker")) {
            const field = el.getAttribute("data-field");
            if (field) {
                colorField = field;
            }
            const colorPickerCaller = document.createElement("t");
            colorPickerCaller.setAttribute("t-call", "web.KanbanColorPicker");
            el.replaceWith(colorPickerCaller);
        }

        // Special actions
        for (const el of kanbanBox.querySelectorAll("a[type],button[type]")) {
            const { type } = extractAttributes(el, ["type"]);
            const params = { type };
            if (SPECIAL_TYPES.includes(type)) {
                if (ACTION_TYPES.includes(type)) {
                    Object.assign(params, extractAttributes(el, ["name", "confirm"]));
                } else if (type === "set_cover") {
                    const { field: fieldName, "auto-open": autoOpen } = extractAttributes(el, [
                        "field",
                        "auto-open",
                    ]);
                    const widget = activeFields[fieldName].widget;
                    Object.assign(params, { fieldName, widget, autoOpen });
                }
                combineAttributes(el, "class", "oe_kanban_action");
                const strParams = Object.keys(params)
                    .map((k) => `${k}:"${params[k]}"`)
                    .join(",");
                el.setAttribute("t-on-click", `triggerAction(record,{${strParams}})`);
            }
        }

        dropdown.setAttribute("menuClass", `'${menuClass.join(" ")}'`);
        dropdown.setAttribute("togglerClass", `'${togglerClass.join(" ")}'`);

        return {
            arch,
            activeActions,
            className,
            defaultGroupBy,
            colorField,
            quickCreate,
            recordsDraggable,
            limit: limit ? parseInt(limit, 10) : 40,
            progress: progressBarInfo,
            xmlDoc: applyDefaultAttributes(kanbanBox),
            activeFields,
            tooltips,
        };
    }
}

// -----------------------------------------------------------------------------

class KanbanView extends owl.Component {
    setup() {
        this.archInfo = new KanbanArchParser().parse(this.props.arch, this.props.fields);
        const { resModel, fields } = this.props;
        const { activeFields, limit, defaultGroupBy } = this.archInfo;
        this.model = useModel(RelationalModel, {
            activeFields,
            progress: this.archInfo.progress,
            fields,
            resModel,
            limit,
            defaultGroupBy,
            viewMode: "kanban",
            openGroupsByDefault: true,
            dataPointClasses: {
                DynamicGroupList: KanbanDynamicGroupList,
            },
        });
        useViewButtons(this.model);
        useSetupView({
            /** TODO **/
        });
    }
}

KanbanView.type = "kanban";
KanbanView.display_name = "Kanban";
KanbanView.icon = "fa-th-large";
KanbanView.multiRecord = true;
KanbanView.template = `web.KanbanView`;
KanbanView.components = { Layout, KanbanRenderer };
KanbanView.props = { ...standardViewProps };

registry.category("views").add("kanban", KanbanView);
