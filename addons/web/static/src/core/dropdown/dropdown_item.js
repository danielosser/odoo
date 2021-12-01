/** @odoo-module **/

const { Component, QWeb } = owl;

/**
 * @enum {string}
 */
export const ParentClosingMode = {
    None: "none",
    ClosestParent: "closest",
    AllParents: "all",
};

/**
 * @typedef DropdownItemSelectedEventDetail
 * @property {*} payload
 * @property {Object} dropdownClosingRequest
 * @property {boolean} dropdownClosingRequest.isFresh
 * @property {ParentClosingMode} dropdownClosingRequest.mode
 *
 * @typedef {CustomEvent<DropdownItemSelectedEventDetail>} DropdownItemSelectedEvent
 */

/**
 * @extends Component
 */
export class DropdownItem extends Component {
    /**
     * Tells the parent dropdown that an item was selected and closes the
     * parent(s) dropdown according the the parentClosingMode prop.
     *
     * @param {MouseEvent} ev
     */
    onClick(ev) {
        const { href, payload, parentClosingMode } = this.props;
        if (href) {
            ev.preventDefault();
        }
        const { dropdown } = this.env;
        if (!dropdown) {
            return;
        }
        dropdown.selectItem(payload);
        const { ClosestParent, AllParents } = ParentClosingMode;
        switch (parentClosingMode) {
            case ClosestParent:
                dropdown.close();
                break;
            case AllParents:
                dropdown.closeAllParents();
                break;
        }
    }
}
DropdownItem.template = "web.DropdownItem";
DropdownItem.props = {
    payload: {
        optional: true,
    },
    parentClosingMode: {
        type: ParentClosingMode,
        optional: true,
    },
    hotkey: {
        type: String,
        optional: true,
    },
    href: {
        type: String,
        optional: true,
    },
    title: {
        type: String,
        optional: true,
    },
};
DropdownItem.defaultProps = {
    parentClosingMode: ParentClosingMode.AllParents,
};

QWeb.registerComponent("DropdownItem", DropdownItem);
