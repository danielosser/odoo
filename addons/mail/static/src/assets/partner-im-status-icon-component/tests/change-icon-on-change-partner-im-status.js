/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            change icon on change partner im status
        [Test/model]
            PartnerImStatusIconComponent
        [Test/assertions]
            4
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
                    .{Partner/isImStatusOnline}
                [2]
                    partner IM status icon should have online status rendering

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{Record/update}
                        [0]
                            @partner
                        [1]
                            [Partner/imStatus]
                                offline
            {Test/assert}
                [0]
                    @record
                [1]
                    @partner
                    .{Partner/isImStatusOffline}
                [2]
                    partner IM status icon should have offline status rendering

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{Record/update}
                        [0]
                            @partner
                        [1]
                            [Partner/imStatus]
                                away
            {Test/assert}
                [0]
                    @record
                [1]
                    @partner
                    .{Partner/isImStatusAway}
                [2]
                    partner IM status icon should have away status rendering

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{Record/update}
                        [0]
                            @partner
                        [1]
                            [Partner/imStatus]
                                online
            {Test/assert}
                [0]
                    @record
                [1]
                    @partner
                    .{Partner/isImStatusOnline}
                [2]
                    partner IM status icon should have online status rendering in the end
`;
