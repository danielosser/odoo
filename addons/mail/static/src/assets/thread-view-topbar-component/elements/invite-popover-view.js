/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            invitePopoverView
        [Element/model]
            ThreadViewTopbarComponent
        [Element/isPresent]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/invitePopoverView}
        [web.Element/target]
            PopoverViewComponent
        [Element/props]
            [PopoverViewComponent/popoverView]
                @record
                .{ThreadViewTopbarComponent/threadViewTopbar}
                .{ThreadViewTopbar/invitePopoverView}
        [web.Element/style]
            {web.scss/selector}
                [0]
                    .popover-body
                [1]
                    [web.scss/padding]
                        0
                        {Dev/comment}
                            cancel unwanted padding
`;