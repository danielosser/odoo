/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            quickSearch
        [Element/model]
            DiscussSidebarComponent
        [web.Element/tag]
            input
        [Element/isPresent]
            {Record/all}
                [Record/traits]
                    Thread
                {func}
                    [in]
                        thread
                    [out]
                        @thread
                        .{Thread/isPinned}
                        .{&}
                            @thread
                            .{Thread/model}
                            .{=}
                                mail.channel
            .{Collection/length}
            .{>}
                19
        [web.Element/placeholder]
            {Locale/text}
                Quick search...
        [web.Element/textContent]
            @record
            .{DiscussSidebarComponent/discuss}
            .{Discuss/sidebarQuickSearchValue}
        [Element/onInput]
            {web.Event/stopPropagation}
                @ev
            {Discuss/onInputQuickSearch}
                [0]
                    @record
                    .{DiscussSidebarComponent/discuss}
                [1]
                    @record
                    .{DiscussSidebarComponent/quickSearch}
                    .{web.Element/value}
        [web.Element/style]
            [web.scss/border-radius]
                10
                px
            [web.scss/margin]
                0
                {scss/$o-mail-discuss-sidebar-scrollbar-width}
                10px
            [web.scss/padding]
                3px
                10px
            [web.scss/border]
                none
            [web.scss/outline]
                none
`;
