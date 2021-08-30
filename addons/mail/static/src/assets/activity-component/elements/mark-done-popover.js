/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            markDonePopover
        [Element/model]
            ActivityComponent
        [Field/target]
            Popover
        [Element/props]
            [Popover/position]
                right
            [Popover/title]
                {Locale/text}
                    Mark Done
        [web.Element/isPresent]
            record
            .{ActivityComponent/activity}
            .{Activity/category}
            .{!=}
                upload_file
        [Element/slot]
            {qweb}
                ${
                    `
                        <button
                            class="
                                o-ActivityComponent-toolButton
                                o-ActivityComponent-markDoneButton
                                btn btn-link
                            "
                            t-att-title="${
                                Define`
                                    {Locale/text}
                                        Mark Done
                                `
                            }"
                        >
                            <i class="fa fa-check"/> Mark Done
                        </button>
                        <t t-set="opened">
                            <ActivityMarkDonePopoverComponent activity="${
                                Define`
                                    @record
                                    .{ActivityComponent/activity}
                                `
                            }"/>
                        </t>
                    `
                }
                
`;
