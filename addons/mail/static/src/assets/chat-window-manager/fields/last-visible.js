/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            lastVisible
        [Field/model]
            ChatWindowManager
        [Field/type]
            m2o
        [Field/target]
            ChatWindow
        [Field/compute]
            {if}
                @record
                .{ChatWindowManager/allOrderedVisible}
                .{Collection/last}
                .{isFalsy}
            .{then}
                {Record/empty}
            .{else}
                @record
                .{ChatWindowManager/allOrderedVisible}
                .{Collection/last}
`;
