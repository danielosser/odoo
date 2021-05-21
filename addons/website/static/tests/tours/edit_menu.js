/** @odoo-module */

import wTourUtils from 'website.tour_utils';
import tour from 'web_tour.tour';

const clickOnExtraMenuItem = {
    content: "Click on the extra menu modal if it is there",
    trigger: '#top_menu',
    run: function () {
        const extraMenuButton = this.$anchor[0].querySelector('.o_extra_menu_items a.nav-link');
        if (extraMenuButton) {
            extraMenuButton.click();
        }
    }
};

const clickOnSave = {
   content: "Clicks on the menu edition dialog save button",
   trigger: '.modal-dialog .btn-primary span:contains("Save")',
};

tour.register('edit_menu', {
    test: true,
    url: '/',
}, [
    // Add a megamenu item from the menu.
    {
        content: "Open Pages menu",
        trigger: '.o_menu_sections a:contains("Pages")',
    },
    {
        content: "Click on Edit Menu",
        trigger: 'a.dropdown-item:contains("Edit Menu")',
    },
    {
        content: "Trigger the link dialog (click 'Add Mega Menu Item')",
        extra_trigger: '.o_web_editor_dialog:visible',
        trigger: '.modal-body a.js_add_menu[data-type="mega"]',
    },
    {
        content: "Write a label for the new menu item",
        extra_trigger: '.o_link_dialog',
        trigger: '.o_link_dialog #o_link_dialog_label_input',
        run: 'text Megaaaaa!'
    },
    clickOnSave,
    clickOnSave,
    {
        ...clickOnExtraMenuItem,
        extra_trigger: 'a[data-action="edit"]',
    },
    {
        content: "Menu should have a new megamenu item",
        trigger: '#top_menu .nav-item a.o_mega_menu_toggle:contains("Megaaaaa!")',
        run: function () {}, // It's a check.
    },
    // Add a menu item in edit mode.
    wTourUtils.clickOnEdit(),
    {
        content: "Click on a menu item",
        trigger: '#top_menu .nav-item a',
        extra_trigger: '#oe_snippets.o_loaded',
    },
    {
        content: "Click on Edit Menu",
        trigger: '.o_edit_menu_popover a.js_edit_menu',
    },
    {
        content: "Trigger the link dialog (click 'Add Menu Item')",
        extra_trigger: '.o_web_editor_dialog:visible',
        trigger: '.modal-body a.js_add_menu',
    },
    clickOnSave,
    {
        content: "It didn't save without a label. Fill label input.",
        extra_trigger: '.o_link_dialog',
        trigger: '.o_link_dialog #o_link_dialog_label_input',
        run: 'text Random!',
    },
    clickOnSave,
    {
        content: "It didn't save without a url. Fill url input.",
        extra_trigger: '.o_link_dialog',
        trigger: '.o_link_dialog #o_link_dialog_url_input',
        run: 'text #',
    },
    clickOnSave,
    clickOnSave,
    wTourUtils.clickOnEdit(),
    // Edit the new menu item
    {
        ...clickOnExtraMenuItem,
        extra_trigger: '#oe_snippets.o_loaded',
    },
    {
        content: "Menu should have a new link item",
        trigger: '#top_menu .nav-item a:contains("Random!")',
    },
    {
        content: "Click on Edit Link",
        trigger: '.o_edit_menu_popover a.o_we_edit_link',
    },
    {
        content: "Change the label",
        trigger: '.o_link_dialog #o_link_dialog_label_input',
        run: 'text Modnar',
    },
    clickOnSave,
    {
        content: "Label should have changed",
        trigger: '#top_menu .nav-item a:contains("Modnar")',
        run: () => {}, // It's a check.
    },
]);
