/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            initially away
        [Test/model]
            PartnerImStatusIconComponent
        [Test/assertions]
            1
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
                        away
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
                    .{Partner/isImStatusAway}
                [2]
                    partner IM status icon should have away status rendering
`;
