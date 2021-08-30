/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            sidebar: basic chat rendering
        [Test/model]
            DiscussComponent
        [Test/assertions]
            9
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
                    [mail.channel/members]
                        {Dev/comment}
                            expected partners
                        [0]
                            @record
                            .{Test/data}
                            .{Data/currentPartnerId}
                        [1]
                            17
                    [mail.channel/public]
                        private
                        {Dev/comment}
                            expected value for testing a chat
                [1]
                    {Dev/comment}
                        expected correspondent, with a random unique id
                        that will be used to link partner to chat and a
                        random name that will be asserted in the test
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        17
                    [res.partner/name]
                        Demo
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
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have one chat item
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChat}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/thread}
                    .{=}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                10
                            [Thread/model]
                                mail.channel
                [2]
                    should have chat with Id 10
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChat}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/threadIcon}
                [2]
                    should have an icon
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChat}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/name}
                [2]
                    should have a name
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChat}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/name}
                    .{web.Element/textContent}
                    .{=}
                        Demo
                [2]
                    should have correspondent name as name
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChat}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/commands}
                [2]
                    should have commands
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
                        1
                [2]
                    should have 1 command
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
                [2]
                    should have 'unpin' command
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
                    .{isFalsy}
                [2]
                    should have a counter when equals 0 (default value)
`;
