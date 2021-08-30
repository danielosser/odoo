/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            sidebar
        [Element/model]
            DiscussComponent
        [Field/target]
            DiscussSidebarComponent
        [Element/isPresent]
            {Messaging/isInitialized}
            .{&}
                {Device/isMobile}
                .{isFalsy}
        [web.Element/class]
            bg-light
            border-right
        [web.Element/style]
            [web.scss/height]
                {scss/scss/map-get}
                    {scss/$sizes}
                    100
            [web.scss/overflow]
                auto
            [web.scss/padding-top]
                {scss/map-get}
                    {scss/$spacers}
                    3
            [web.scss/flex]
                0
                0
                auto
`;
