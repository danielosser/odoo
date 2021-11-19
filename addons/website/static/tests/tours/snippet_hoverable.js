/** @odoo-module alias=snippet.hoverable **/
'use strict';

import tour from 'web_tour.tour';
import wTourUtils from 'website.tour_utils';

function clickColumnHoverActivate(message = 'Click hoverable activation toggle') {
    return {
        content: message,
        trigger: 'we-title:has(span:contains("Column"):not(:contains("Columns"))) ~ * we-row:has(we-title:contains("Toggle Hover Column")) we-checkbox',
    };
}

function clickColumnHoverEdit(message = 'Click hoverable edit toggle') {
    return {
        content: message,
        trigger: 'we-title:has(span:contains("Column"):not(:contains("Columns"))) ~ * we-row:has(we-title:contains("Edit Hover Column")) we-checkbox',
    };
}

function checkDeactivated() {
    return {
        content: 'Check if hoverable is deactivated',
        trigger: '.s_three_columns .o_hoverable_edit',
        run: function () {
            if (this.$anchor.find('.s_hoverable').length > 0) {
                console.error('The hoverable overlay is not deactivated');
            }
        },
    };
}

function checkVisibility(status) {
    const visibleStep = {
        content: 'Check if hoverable is shown',
        trigger: '.s_three_columns .o_hoverable_edit .s_hoverable',
        run: () => {},
    };
    const invisibleStep = {
        content: 'Check if hoverable is hidden',
        trigger: '.s_three_columns .o_hoverable_edit',
        run: function () {
            // The offsetParent will be null if the element is not shown.
            if (this.$anchor.find('.s_hoverable')[0].offsetParent !== null) {
                console.error('The hoverable overlay is not hidden');
            }
        },
    };
    return [status ? visibleStep : invisibleStep, {
        content: 'Check if the invisible element is correctly rendered',
        trigger: `.o_we_invisible_el_panel div:contains("Block") > i.${status ? 'fa-eye' : 'fa-eye-slash'}`,
        run: () => {},
    }];
}

function toggleVisibility() {
    return {
        content: 'Toggle the visibility of the overlay using the invisible elements panel',
        trigger: `.o_we_invisible_el_panel div:contains("Block") > i`,
    };
}

tour.register('snippet_hoverable', {
    test: true,
    url: '/?enable_editor=1',
}, [
    wTourUtils.dragNDrop({
        id: 's_three_columns',
        name: 'Columns',
    }),
    {
        content: "Click on first column",
        trigger: '#wrap .s_three_columns .row > :nth-child(1)',
    },
    clickColumnHoverActivate('Activate hoverable overlay'),
    ...checkVisibility(true),
    clickColumnHoverEdit('Hide hoverable overlay'),
    ...checkVisibility(false),
    toggleVisibility(),
    ...checkVisibility(true),
]);
