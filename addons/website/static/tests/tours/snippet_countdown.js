odoo.define("website.tour.snippet_countdown", function (require) {
"use strict";

const tour = require('web_tour.tour');
const wTourUtils = require('website.tour_utils');

tour.register('snippet_countdown_preview', {
    test: true,
    url: '/?enable_editor=1',
}, [
    wTourUtils.dragNDrop({id: 's_countdown',name: 'Countdown'}),
    wTourUtils.clickOnSnippet({id: 's_countdown', name: 'Countdown'}),
    wTourUtils.changeOption('countdown', 'we-title:contains("at the end") + div we-toggler'),
    wTourUtils.changeOption('countdown', 'we-button:contains("Show Message")', 'end action'),
    wTourUtils.changeOption('countdown', 'we-select + we-button', 'message preview'),
    {
        trigger: 'we-title:contains("Hide countdown")',
        run: () => {
            $('we-title:contains("Hide countdown")').trigger('mouseover');
        },
    },
    {
        trigger: 'h2:contains("Happy Odoo Anniversary")',
        run: () => null,
    },
]);
});
