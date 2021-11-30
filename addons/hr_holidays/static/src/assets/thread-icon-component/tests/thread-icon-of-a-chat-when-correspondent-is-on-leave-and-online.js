/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            thread icon of a chat when correspondent is on leave & online
        [Test/feature]
            hr_holidays
        [Test/model]
            ThreadIconComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        chat
                    [mail.channel/id]
                        20
                    [mail.channel/members]
                        [0]
                            @record
                            .{Test/data}
                            .{Data/currentPartnerId}
                        [1]
                            7
                [1]
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        7
                    [res.partner/im_status]
                        leave_online
                    [res.partner/name]
                        Demo
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :thread
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ThreadIconComponent
                [ThreadIconComponent/thread]
                    @thread
            {Test/assert}
                []
                    @thread
                    .{Thread/threadIconComponents}
                    .{Collection/first}
                    .{ThreadIconComponent/online}
                []
                    thread icon should have online status rendering
            {Test/assert}
                []
                    @thread
                    .{Thread/threadIconComponents}
                    .{Collection/first}
                    .{ThreadIconComponent/icon}
                    .{web.Element/class}
                    .{String/includes}
                        fa-plane
                []
                    thread icon should have leave status rendering
`;
