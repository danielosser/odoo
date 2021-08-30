/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        All online members ordered like they are displayed.
    {Field}
        [Field/name]
            orderedOnlineMembers
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Partner
        [Field/compute]
            {Thread/_sortMembers}
                [0]
                    @record
                [1]
                    @record
                    .{Thread/members}
                    .{Collection/filter}
                        {func}
                            [in]
                                item
                            [out]
                                @item
                                .{Partner/isOnline}
`;
