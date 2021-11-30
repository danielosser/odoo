/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            threadCacheInitialScrollPosition
        [Field/model]
            ThreadView
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/compute]
            {if}
                @record
                .{ThreadView/threadCache}
                .{isFalsy}
            .{then}
                {Record/empty}
                {break}
            :threadCacheInitialScrollPosition
                @record
                .{ThreadView/threadCacheInitialScrollPositions}
                .{Record/get}
                    @record
                    .{ThreadView/threadCache}
                    .{Record/id}
            {if}
                @threadCacheInitialScrollPosition
                .{!=}
                    undefined
            .{then}
                @threadCacheInitialScrollPosition
            .{else}
                {Record/empty}
`;
