/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            doneScheduleNextButton
        [Element/model]
            ActivityMarkDonePopoverComponent
        [web.Element/tag]
            button
        [web.Element/class]
            btn
            btn-sm
            btn-primary
        [web.Element/type]
            button
        [Element/onClick]
            {Activity/markAsDoneAndScheduleNext}
                [0]
                    @record
                    .{ActivityMarkDonePopoverComponent/activity}
                [1]
                    [feedback]
                        @record
                        .{ActivityMarkDonePopoverComponent/feedback}
                        .{web.Element/value}
        [web.Element/textContent]
            {Locale/text}
                Done & Schedule Next
`;
