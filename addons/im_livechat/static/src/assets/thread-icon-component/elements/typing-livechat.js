/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            typingLivechat
        [Element/feature]
            im_livechat
        [Element/model]
            ThreadIconComponent
        [Field/target]
            ThreadTypingIconComponent
        [Model/traits]
            ThreadTypingIcon/typing
        [Element/isPresent]
            @record
            .{ThreadIconComponent/thread}
            .{Thread/channelType}
            .{=}
                livechat
            .{&}
                @record
                .{ThreadIconComponent/thread}
                .{Thread/orderedOtherTypingMembers}
                .{Collection/length}
                .{>}
                    0
        [Element/props]
            [ThreadTypingIconComponent/animation]
                pulse
            [ThreadTypingIconComponent/title]
                @record
                .{ThreadIconComponent/thread}
                .{Thread/typingStatusText}
`;
