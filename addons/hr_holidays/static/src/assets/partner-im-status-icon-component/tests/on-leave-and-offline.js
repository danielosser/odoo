/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            on leave & offline
        [Test/feature]
            hr_holidays
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
                    [Partner/id]
                        7
                    [Partner/imStatus]
                        leave_offline
                    [Partner/name]
                        Demo User
            @testEnv
            .{Record/insert}
                [Record/traits]
                    PartnerImStatusIconComponent
                [PartnerImStatusIconComponent/partner]
                    @partner
            {Test/assert}
                []
                    @partner
                    .{Partner/isImStatusOffline}
                []
                    partner IM status icon should have offline status rendering
            {Test/assert}
                []
                    @partner
                    .{Partner/partnerImStatusIconComponents}
                    .{Collection/first}
                    .{PartnerImStatusIconComponent/icon}
                    .{web.Element/class}
                    .{String/includes}
                        fa-plane
                []
                    partner IM status icon should have leave status rendering
`;
