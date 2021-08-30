/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onUpdate
        [Lifecycle/model]
            DiscussSidebarComponent
        [Lifecycle/behavior]
            {if}
                @record
                .{DiscussSidebarComponent/discuss}
                .{isFalsy}
            .{then}
                {break}
            {if}
                @record
                .{DiscussSidebarComponent/quickSearch}
            .{then}
                {Record/update}
                    [0]
                        @record
                        .{DiscussSidebarComponent/quickSearch}
                    [1]
                        [web.Element/value]
                            @record
                            .{DiscussSidebarComponent/discuss}
                            .{Discuss/sidebarQuickSearchValue}
`;
