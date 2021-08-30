/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            doneButton
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
        [Element/isPresent]
            @record
            .{ActivityMarkDonePopoverComponent/activity}
            .{Activity/chainingType}
            .{=}
                suggest
        [Element/onClick]
            {Activity/markAsDone}
                [0]
                    @record
                    .{ActivityMarkDonePopoverComponent/activity}
                [1]
                    [feedback]
                        @record
                        .{ActivityMarkDonePopoverComponent/feedback}
                        .{web.Element/value}
            {Component/trigger}
                [0]
                    @record
                [1]
                    reload
                [2]
                    [keepChanges]
                        true
        [web.Element/textContent]
            {Locale/text}
                Done
        [web.Element/style]
            [web.scss/margin]
                [0]
                    {scss/map-get}
                        {scss/$spacers}
                        0
                [1]
                    {scss/map-get}
                        {scss/$spacers}
                        2
`;
