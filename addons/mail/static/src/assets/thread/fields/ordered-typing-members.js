/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Ordered typing members on this thread. Lower index means this member
        is currently typing for the longest time. This list includes current
        partner as typer.
    {Field}
        [Field/name]
            orderedTypingMembers
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Partner
        [Field/compute]
            @record
            .{Thread/orderedTypingMemberLocalIds}
            .{Collection/map}
                {func}
                    [in]
                        item
                    [out]
                        {Record/get}
                            @item
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{isTruthy}
`;
