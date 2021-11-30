/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            counter
        [Element/model]
            DiscussSidebarMailboxComponent
        [Model/traits]
            DiscussSidebarMailboxComponent/item
        [Element/isPresent]
            @record
            .{DiscussSidebarMailboxComponent/mailbox}
            .{Thread/counter}
            .{>}
                0
        [web.Element/class]
            badge
            badge-pill
        [web.Element/style]
            [web.scss/background-color]
                {scss/$o-brand-primary}
            [web.scss/color]
                {scss/gray}
                    300
            {if}
                @record
                .{DiscussSidebarMailboxComponent/mailbox}
                .{=}
                    {Env/starred}
            .{then}
                [web.scss/border-color]
                    {scss/gray}
                        400
                [web.scss/background-color]
                    {scss/gray}
                        400
                [web.scss/color]
                    {scss/gray}
                        300
        [web.Element/textContent]
            @record
            .{DiscussSidebarMailboxComponent/mailbox}
            .{Thread/counter}
`;
