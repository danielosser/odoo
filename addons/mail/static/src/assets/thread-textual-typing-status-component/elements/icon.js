/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            icon
        [Element/model]
            ThreadTextualTypingStatusComponent
        [Field/target]
            ThreadTypingIconComponent
        [Element/isPresent]
            @record
            .{ThreadTextualTypingStatusComponent/thread}
            .{&}
                @record
                .{ThreadTextualTypingStatusComponent/thread}
                .{Thread/orderedOtherTypingMembers}
                .{Collection/length}
                .{>}
                    0
        [Element/props]
            [ThreadTypingIconComponent/animation]
                pulse
            [ThreadTypingIconComponent/size]
                medium
`;
