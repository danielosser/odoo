/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Ordered typing members on this thread, excluding the current partner.
    {Field}
        [Field/name]
            orderedOtherTypingMembers
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Partner
        [Field/compute]
            @record
            .{Thread/orderedTypingMembers}
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{!=}
                            {Env/currentPartner}
`;
