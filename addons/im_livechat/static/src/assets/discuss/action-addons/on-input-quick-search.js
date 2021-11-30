/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/feature]
            im_livechat
        [ActionAddon/action]
            Discuss/onInputQuickSearch
        [ActionAddon/params]
            record
            value
        [ActionAddon/behavior]
            {if}
                @record
                .{Discuss/sidebarQuickSearchValue}
                .{isFalsy}
            .{then}
                {DiscussSidebarCategory/open}
                    @record
                    .{Discuss/categoryLivechat}
            .{else}
                @original
`;
