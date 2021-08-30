/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The total amount unread/action-needed threads in the category.
    {Field}
        [Field/name]
            counter
        [Field/model]
            DiscussSidebarCategory
        [Field/type]
            attr
        [Field/target]
            Integer
        [Field/compute]
            {switch}
                @record
                .{DiscussSidebarCategory/counterComputeMethod}
            .{case}
                [needaction]
                    @record
                    .{DiscussSidebarCategory/selectedChannels}
                    .{Collection/filter}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{Thread/messageNeedactionCounter}
                                .{>}
                                    0
                    .{Collection/length}
                [unread]
                    @record
                    .{DiscussSidebarCategory/selectedChannels}
                    .{Collection/filter}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{Thread/localMessageUnreadCounter}
                                .{>}
                                    0
                    .{Collectionlength}
`;
