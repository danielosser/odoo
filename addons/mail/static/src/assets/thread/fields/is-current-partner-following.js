/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isCurrentPartnerFollowing
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
        [Field/compute]
            @record
            .{Thread/followers}
            .{Collection/some}
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{Follower/partner}
                        .{&}
                            @follower
                            .{Follower/partner}
                            .{=}
                                {Env/currentPartner}
`;
