/** @odoo-module alias=snippet.hoverable **/
'use strict';

import tour from 'web_tour.tour';
import wTourUtils from 'website.tour_utils';

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
    {
        content: "Activate hoverable overlay",
        trigger: 'we-title:has(span:contains("Column"):not(:contains("Columns"))) we-button.fa-bolt',
    },
    {
        content: "Check if hoverable is shown",
        trigger: '.s_three_columns .o_hoverable_edit.o_hoverable_displayed .s_hoverable',
        run: () => {},
    },
    {
        content: "Hide hoverable overlay",
        trigger: 'we-button.active[data-select-class="o_hoverable_displayed"] we-checkbox',
    },
    {
        content: "Check if hoverable is hidden",
        trigger: '.s_three_columns .o_hoverable_edit',
        run: function () {
            // The offsetParent will be null if the element is not shown.
            if (this.$anchor.find('.s_hoverable')[0].offsetParent !== null) {
                console.error('The hoverable overlay is not hidden');
            }
        },
    },
]);
