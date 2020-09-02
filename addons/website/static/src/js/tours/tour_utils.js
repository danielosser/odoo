odoo.define("website.tour_utils", function (require) {
"use strict";

const core = require("web.core");
const _t = core._t;




/**

const snippets = [
    {
        id: 's_cover',
        name: 'Cover',
    },
    {
        id: 's_text_image',
        name: 'Text - Image',
    }
];

tour.register("themename_tour", {
    url: "/",
    saveAs: "homepage",
}, [
    wTourUtils.dragNDrop(snippets[0]),
    wTourUtils.clickOnText(snippets[0], 'h1'),
    wTourUtils.changeAnOption('colorFilter', 'span.o_we_color_preview', 'color filter'),
    wTourUtils.selectHeader(),
    wTourUtils.changeAnOption('HeaderTemplate', '[data-name="header_alignment_opt"]', 'alignment'),
    wTourUtils.goBackToBlocks(),
    wTourUtils.dragNDrop(snippets[1]),
    wTourUtils.changeImage(snippets[1]),
    wTourUtils.chooseBackgroundColor(),
    wTourUtils.clickOnSave(),
]);
**/

/**
 * Click on the top right edit button
 * @param {*} position Where the purple arrow will show up
 */
function clickOnEdit(position = "bottom") {
    return {
        trigger: "a[data-action=edit]",
        content: _t("<b>Click Edit</b> to start designing your homepage."),
        extra_trigger: ".homepage",
        position: position,
    };
}

/**
 * Drag a snippet from the Blocks area and drop it in the Edit area
 * @param {*} snippet contain the id and the name of the targeted snippet
 * @param {*} position Where the purple arrow will show up
 */
function dragNDrop(snippet, position = "bottom") {
    return {
        trigger: `#oe_snippets .oe_snippet[name="${snippet.name}"] .oe_snippet_thumbnail`,
        extra_trigger: "body.editor_enable.editor_has_snippets",
        moveTrigger: '.oe_drop_zone',
        content: _t(`Drag the <i>${snippet.name}</i> block and drop it in your page.`),
        position: position,
        run: "drag_and_drop #wrap",
    };
}

/**
 * Click on a snippet's text to modify its content
 * @param {*} snippet
 * @param {*} element Target the element which should be rewrite
 * @param {*} position
 */
function clickOnText(snippet, element, position = "bottom") {
    return {
        trigger: `#wrapwrap .${snippet.id} ${element}`,
        content: _t("<b>Click on a text</b> to start editing it."),
        position: position,
        run: "text",
        consumeEvent: "input",
        optional: "true",
    };
}

function changeImage(snippet, position = "bottom") {
    return {
        trigger: `#wrapwrap .${snippet.id} img`,
        content: _t("<b>Double click on an image</b> to change it."),
        position: position,
        run: "dblclick",
    };
}

function changeIcon(snippet, index = 0, position = "bottom") {
    return {
        trigger: `#wrapwrap .${snippet.id} i:eq(${index})`,
        content: _t("<b>Double click on an icon</b> to change it."),
        position: position,
        run: "dblclick",
    };
}

function chooseImage(index = 0, position = "top") {
    return {
        trigger: `#editor-media-image .o_we_images .o_existing_attachment_cell:eq(${index})`,
        content: _t("<b>Select the image</b> you want."),
        position: position,
        run: "click",
    };
}

function chooseIcon(icon, position = "top") {
    return {
        trigger: `#editor-media-icon .font-icons-icons span.${icon}`,
        content: _t("<b>Select the image</b> you want."),
        position: position,
        run: "click",
    };
}

function addMedia(position = "right") {
    return {
        trigger: `.modal-content footer .btn-primary`,
        content: _t("<b>Add</b> the selected image."),
        position: position,
        run: "click",
    };
}

/**
 * Simple click on a snippet in the edition area
 * @param {*} snippet
 * @param {*} position
 */
function clickOnSnippet(snippet, position = "bottom") {
    return {
        trigger: `#wrapwrap .${snippet.id}`,
        content: _t("<b>Click on a snippet</b> to access its options menu."),
        position: position,
        run: "click",
    };
}

/**
 *
 * @param {*} snippet
 * @param {*} position
 */
function changeBackground(snippet, position = "bottom") {
    return {
        trigger: ".o_we_customize_panel .o_we_edit_image",
        content: _t("Customize any block through this menu. Try to change the background image of this block."),
        position: position,
        run: "click",
    };
}

function changeBackgroundColor(position = "bottom") {
    return {
        trigger: ".o_we_customize_panel .o_we_color_preview",
        content: _t("Customize any block through this menu. Try to change the background color of this block."),
        position: position,
        run: "click",
    };
}

function chooseBackgroundColor(position = "bottom") {
    return {
        trigger: ".o_we_customize_panel .o_we_so_color_palette button[data-color]",
        //trigger: ".o_we_customize_panel .o_we_so_color_palette button[data-color][data-color!='1']",
        content: _t("Now, <b>click</b> on this color to change the background color."),
        position: position,
        run: "click",
    };
}

function changeAnOption(optionName, weName = '', optionTooltipLabel = '', position = "bottom") {
    const option_block = `we-customizeblock-option[class='snippet-option-${optionName}']`
    return {
        trigger: `${option_block} ${weName}, ${option_block} [title='${weName}']`,
        content: _t(`<b>Click</b> on this option to change the ${optionTooltipLabel} of the block.`),
        position: position,
        run: "click",
    };
}

function selectHeader(position = "bottom") {
    return {
        trigger: `header#top`,
        content: _t(`<b>Click</b> on this header to configure it.`),
        position: position,
        run: "click",
    };
}

function changePaddingSize(direction) {
    let paddingDirection = "n";
    let position = "top";
    if (direction === "bottom") {
        paddingDirection = "s";
        position = "bottom";
    }
    return {
        trigger: `.oe_overlay.ui-draggable.o_we_overlay_sticky.oe_active .o_handle.${paddingDirection}`,
        content: _t(`<b>Slide</b> this button to change the ${direction} padding`),
        position: position,
    };
}

function selectSnippetColumn(snippet, index = 0, position = "bottom") {
    return {
        trigger: `#wrapwrap .${snippet.id} .row div[class*="col-lg-"]:eq(${index})`,
        content: _t("<b>Click</b> on this column to access its options."),
        position: position,
        run: "click",
    };
}

function changeColumnSize(position = "right") {
    return {
        trigger: `.oe_overlay.ui-draggable.o_we_overlay_sticky.oe_active .o_handle.e`,
        content: _t("<b>Slide</b> this button to change the column size."),
        position: position,
    };
}

function deleteColumn(position = "left") {
    return {
        trigger: `.o_we_customize_panel we-title:contains("Column") we-button.oe_snippet_remove`,
        content: _t("You can <b>delete</b> a column from here."),
        position: position,
        run: "click",
    };
}

function goToOptions(position = "bottom") {
    return {
        trigger: '.o_we_customize_theme_btn',
        content: _t("Go to the Options tab"),
        position: position,
        run: "click",
    };
}

/**
 *
 * @param {*} position
 */
function goBackToBlocks(position = "bottom") {
    return {
        trigger: '.o_we_add_snippet_btn',
        content: _t("Go back to the blocks menu."),
        position: position,
        run: "click",
    };
}

/**
 *
 * @param {*} position
 */
function clickOnSave(position = "bottom") {
    return {
        trigger: "button[data-action=save]",
        content: _t("Click the <b>Save</b> button."),
        position: position,
    };
}

return {
    dragNDrop,
    clickOnText,
    changeBackground,
    goBackToBlocks,
    clickOnSave,
    clickOnEdit,
    clickOnSnippet,
    changeImage,
    changeIcon,
    chooseImage,
    chooseIcon,
    addMedia,
    changeBackgroundColor,
    chooseBackgroundColor,
    changeAnOption,
    changePaddingSize,
    selectSnippetColumn,
    changeColumnSize,
    deleteColumn,
    goToOptions,
    selectHeader,
};

});
