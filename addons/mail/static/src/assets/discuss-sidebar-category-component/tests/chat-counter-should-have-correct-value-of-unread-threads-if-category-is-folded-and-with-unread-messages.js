/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            chat - counter: should have correct value of unread threads if category is folded and with unread messages
        [Test/model]
            DiscussSidebarCategoryComponent
        [Test/assertions]
            1
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
                        10
                    [mail.channel/message_unread_counter]
                        10
                    [mail.channel/public]
                        private
                [1]
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        chat
                    [mail.channel/id]
                        20
                    [mail.channel/message_unread_counter]
                        20
                    [mail.channel/public]
                        private
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            @testEnv
            .{UI/afterNextRender}
                @testEnv
                .{UI/click}
                    @testEnv
                    .{Discuss/categoryChat}
                    .{DiscussSidebarCategory/discussSidebarCategoryComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryComponent/title}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/categoryChat}
                    .{DiscussSidebarCategory/counter}
                    .{=}
                        2
                [1]
                    should have correct value of unread threads if category is folded and with unread messages
`;
