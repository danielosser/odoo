/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            sidebar: chat rendering with unread counter
        [Test/model]
            DiscussComponent
        [Test/assertions]
            4
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                {Dev/comment}
                    chat expected to be found in the sidebar
                [0]
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        chat
                        {Dev/comment}
                            testing a chat is the goal of the test
                    [mail.channel/id]
                        10
                        {Dev/comment}
                            random unique id, will be referenced in the test
                    [mail.channel/message_unread_counter]
                        100
                    [mail.channel/public]
                        private
                        {Dev/comment}
                            expected value for testing a chat
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
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChat}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/counter}
                [2]
                    should have a counter when different from 0
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChat}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/counter}
                    .{web.Element/textContent}
                    .{=}
                        100
                [2]
                    should have counter value
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChat}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/command}
                    .{Collection/length}
                    .{=}
                        0
                [2]
                    should have no command
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChat}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/commandUnpin}
                    .{isFalsy}
                [2]
                    should not have 'unpin' command
`;
