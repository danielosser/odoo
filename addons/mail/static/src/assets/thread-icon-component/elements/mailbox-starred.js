/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mailboxStarred
        [Element/model]
            ThreadIconComponent
        [web.Element/class]
            fa
            fa-star-o
        [Element/isPresent]
            @record
            .{ThreadIconComponent/thread}
            .{&}
                @record
                .{ThreadIconComponent/thread}
                .{Thread/model}
                .{=}
                    mail.box
            .{&}
                @record
                .{ThreadIconComponent/thread}
                .{=}
                    {Env/starred}
`;
