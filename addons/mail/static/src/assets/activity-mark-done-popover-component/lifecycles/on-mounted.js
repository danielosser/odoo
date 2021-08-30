/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onMounted
        [Lifecycle/model]
            ActivityMarkDonePopoverComponent
        [Lifecycle/behavior]
            {UI/focus}
                @record
                .{ActivityMarkDonePopoverComponent/feedback}
            {if}
                @record
                .{ActivityMarkDonePopoverComponent/activity}
                .{Activity/feedbackBackup}
            .{then}
                {Record/update}
                    [0]
                        @record
                        .{ActivityMarkDonePopoverComponent/feedback}
                        .{web.Element/value}
                    [1]
                        @record
                        .{ActivityMarkDonePopoverComponent/activity}
                        .{Activity/feedbackBackup}
`;
