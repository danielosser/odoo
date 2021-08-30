/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            sidebar: basic channel rendering
        [Test/model]
            DiscussComponent
        [Test/assertions]
            12
        [Test/scenario]
            {Dev/comment}
                channel expected to be found in the sidebar,
                with a random unique id and name that
                will be referenced in the test
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    mail.channel
                [mail.channel/id]
                    20
                [mail.channel/name]
                    General
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
                    .{DiscussSidebarComponent/itemChannel}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have one channel item
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChannel}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/thread}
                    .{=}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                20
                            [Thread/model]
                                mail.channel
                [2]
                    should have channel with Id 20
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{!=}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                20
                            [Thread/model]
                                mail.channel
                [2]
                    should not be active by default
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChannel}
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
                    .{DiscussSidebarComponent/itemChannel}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/name}
                    .{web.Element/textContent}
                    .{=}
                        General
                [2]
                    should have name value
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChannel}
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
                    .{DiscussSidebarComponent/itemChannel}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/command}
                    .{Collection/length}
                    .{=}
                        2
                [2]
                    should have 2 commands
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChannel}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/commandSettings}
                [2]
                    should have 'settings' command
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChannel}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/commandLeave}
                [2]
                    should have 'leave' command
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/itemChannel}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/counter}
                [2]
                    should have a counter when equals 0 (default value)

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Discuss/discussSidebarComponents}
                        .{Collection/first}
                        .{DiscussSidebarComponent/itemChannel}
                        .{Collection/first}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{=}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                20
                            [Thread/model]
                                mail.channel
                [2]
                    channel should become active
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have composer section inside thread content (can post message in channel)
`;
