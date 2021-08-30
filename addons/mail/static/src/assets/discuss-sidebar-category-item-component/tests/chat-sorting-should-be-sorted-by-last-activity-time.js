/** @odoo-module **/

import { Define } from '@mail/define';

import { datetime_to_str } from 'web.time';

export default Define`
    {Test}
        [Test/name]
            chat - sorting: should be sorted by last activity time
        [Test/model]
            DiscussSidebarCategoryItemComponent
        [Test/assertions]
            6
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
                    [mail.channel/public]
                        private
                    [mail.channel/last_interest_dt]
                        {Datetime/toString}
                            {Dev/comment}
                                less recent one
                            {Record/insert}
                                [Record/traits]
                                    Date
                                [Date/year]
                                    2021
                                [Date/month]
                                    0
                                [Date/day]
                                    1
                [1]
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        chat
                    [mail.channel/id]
                        20
                    [mail.channel/public]
                        private
                    [mail.channel/last_interest_dt]
                        {Datetime/toString}
                            {Dev/comment}
                                more recent one
                            {Record/insert}
                                [Record/traits]
                                    Date
                                [Date/year]
                                    2021
                                [Date/month]
                                    0
                                [Date/day]
                                    2
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :chat10
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        10
                    [Thread/model]
                        mail.channel
            :chat20
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
            :initialChats
                @testEnv
                .{Discuss/categoryChat}
                .{DiscussSidebarCategory/discussSidebarCategoryComponents}
                .{Collection/first}
                .{DiscussSidebarCategoryComponent/itemOpen}
            {Test/assert}
                [0]
                    @record
                [1]
                    @initialChats
                    .{Collection/length}
                    .{=}
                        2
                [2]
                    should have 2 livechat items
            {Test/assert}
                [0]
                    @record
                [1]
                    @initialChats
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/thread}
                    .{=}
                        @chat20
                [2]
                    first livechat should be the one with the more recent last activity time
            {Test/assert}
                [0]
                    @record
                [1]
                    @initialChats
                    .{Collection/second}
                    .{DiscussSidebarCategoryItemComponent/thread}
                    .{=}
                        @chat10
                [2]
                    second chat should be the one with the less recent last activity time

            {Dev/comment}
                post a new message on the last channel
            @testEnv
            .{UI/afterNextRender}
                @testEnv
                .{UI/click}
                    @initialChats
                    .{Collection/first}
            @testEnv
            .{UI/afterNextRender}
                @testEnv
                .{UI/insertText}
                    Blabla
            @testEnv
            .{UI/afterNextRender}
                @testEnv
                .{UI/click}
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            ComposerComponent
                    .{Collection/first}
                    .{ComposerComponent/buttonSend}
            :newChats
                @testEnv
                .{Discuss/categoryChat}
                .{DiscussSidebarCategory/discussSidebarCategoryComponents}
                .{Collection/first}
                .{DiscussSidebarCategoryComponent/itemOpen}
            {Test/assert}
                [0]
                    @record
                [1]
                    @newChats
                    .{Collection/length}
                    .{=}
                        2
                [2]
                    should have 2 chat items
            {Test/assert}
                [0]
                    @record
                [1]
                    @newChats
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/thread}
                    .{=}
                        @chat10
                [2]
                    first chat should be the one with the more recent last activity time
            {Test/assert}
                [0]
                    @record
                [1]
                    @newChats
                    .{Collection/second}
                    .{DiscussSidebarCategoryItemComponent/thread}
                    .{=}
                        @chat20
                [2]
                    second chat should be the one with the less recent last activity time
`;
