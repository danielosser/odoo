/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            awayIcon
        [Element/model]
            ThreadIconComponent
        [Model/traits]
            ThreadIconComponent/away
        [web.Element/class]
            fa
            fa-circle
        [Element/isPresent]
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
                .{=}
                    0
            .{&}
                @record
                .{ThreadIconComponent/thread}
                .{Thread/correspondent}
                .{Partner/imStatus}
                .{=}
                    away
        [web.Element/title]
            {Locale/text}
                Away
`;
