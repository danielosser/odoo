/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            sidebar: add channel
        [Test/model]
            DiscussComponent
        [Test/assertions]
            3
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
                    .{DiscussSidebarComponent/channelCategory}
                    .{DiscussSidebarCategoryComponent/commandAdd}
                [2]
                    should be able to add channel from category
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/channelCategory}
                    .{DiscussSidebarCategoryComponent/commandAdd}
                    .{web.Element/title}
                    .{=}
                        Add or join a channel

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Discuss/discussSidebarComponents}
                        .{Collection/first}
                        .{DiscussSidebarComponent/channelCategory}
                        .{DiscussSidebarCategoryComponent/commandAdd}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/discussSidebarComponents}
                    .{Collection/first}
                    .{DiscussSidebarComponent/channelCategory}
                    .{DiscussSidebarCategoryComponent/newItem}
                [2]
                    should have item to add a new channel
`;
