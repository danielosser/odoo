/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        All messages ordered like they are displayed.
    {Field}
        [Field/name]
            orderedMessages
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/compute]
            @record
            .{Thread/messages}
            .{Collection/sort}
                {func}
                    [in]
                        item1
                        item2
                    [out]
                        {if}
                            @item1
                            .{Message/id}
                            .{<}
                                @item2
                                .{Message/id}
                        .{then}
                            -1
                        .{else}
                            1
`;
