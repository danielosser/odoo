/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            initially online
        [Test/model]
            PartnerImStatusIconComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :partner
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Partner
                    [Partner/id]
                        7
                    [Partner/name]
                        Demo User
                    [Partner/imStatus]
                        online
            @testEnv
            .{Record/insert}
                [Record/traits]
                    PartnerImStatusIconComponent
                [PartnerImStatusIconComponent/partner]
                    @partner
            {Test/assert}
                [0]
                    @record
                [1]
                    @partner
                    .{Partner/partnerImStatusIconComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have partner IM status icon
            {Test/assert}
                [0]
                    @record
                [1]
                    @partner
                    .{Partner/isImStatusOnline}
                [2]
                    partner IM status icon should have online status rendering
`;
