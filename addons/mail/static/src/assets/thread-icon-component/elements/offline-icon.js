/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            offlineIcon
        [Element/model]
            ThreadIconComponent
        [Model/traits]
            ThreadIconComponent/offline
        [web.Element/class]
            fa
            fa-circle-o
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
                .{Thread/correspondent}
                .{Partner/imStatus}
                .{=}
                    offline
        [web.Element/title]
            {Locale/text}
                Offline
`;
