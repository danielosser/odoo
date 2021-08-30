/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            sidebar: inbox with counter
        [Test/model]
            DiscussComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                {Dev/comment}
                    notification expected to be counted at init_messaging
                [Record/traits]
                    mail.notification
                [mail.notification/res_partner_id]
                    @record
                    .{Test/data}
                    .{Data/currentPartnerId}
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Env/inbox}
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/counter}
                [2]
                    should display a counter (= have a counter when different from 0)
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Env/inbox}
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/counter}
                    .{web.Element/textContent}
                    .{=}
                        1
                [2]
                    should have counter value
`;
