/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            typingChat
        [Element/model]
            ThreadIconComponent
        [Field/target]
            ThreadTypingIconComponent
        [Model/traits]
            ThreadIconComponent/typing
        [Element/isPresent]
            @record
            .{ThreadIconComponent/thread}
            .{&}
                @record
                .{ThreadIconComponent/thread}
                .{Thread/channelType}
                .{=}
                    chat
            .{&}
                @record
                .{ThreadIconComponent/thread}
                .{Thread/correspondent}
            .{&}
                @record
                .{ThreadIconComponent/thread}
                .{Thread/orderedOtherTypingMembers}
                .{Collection/length}
                .{>}
                    0
        [Element/props]
            [ThreadTypingIconComponent/animate]
                pulse
            [ThreadTypingIconComponent/title]
                @record
                .{ThreadIconComponent/thread}
                .{Thread/typingStatusText}
`;
