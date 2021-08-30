/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            feedback
        [Element/model]
            ActivityMarkDonePopoverComponent
        [web.Element/tag]
            textarea
        [web.Element/class]
            form-control
        [web.Element/rows]
            3
        [web.Element/placeholder]
            {Locale/text}
                Write Feedback
        [web.Element/placeholder]
            {Locale/text}
                Write Feedback
        [Element/onBlur]
            {Record/update}
                [0]
                    @record
                    .{ActivityMarkDonePopoverComponent/activity}
                [1]
                    [Activity/feedbackBackup]
                        @record
                        .{ActivityMarkDonePopoverComponent/feedback}
                        .{web.Element/value}
        [web.Element/style]
            [web.scss/min-height]
                70
                px
`;
