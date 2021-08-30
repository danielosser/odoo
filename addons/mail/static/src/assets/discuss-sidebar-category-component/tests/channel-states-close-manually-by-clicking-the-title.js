/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            channel - states: close manually by clicking the title
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
                    [mail.channel/id]
                        20
                [1]
                    [Record/traits]
                        res.users.settings
                    [res.users.settings/user_id]
                        @record
                        .{Test/data}
                        .{Data/currentUserId}
                    [res.users.settings/is_discuss_sidebar_category_channel_open]
                        true
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            {UI/afterNextRender}
                @testEnv
                .{UI/click}
                    @testEnv
                    .{Discuss/categoryChannel}
                    .{DiscussSidebarCategory/discussSidebarCategoryComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryComponent/title}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Thread/id]
                            20
                        [Thread/model]
                            mail.channel
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/length}
                    .{=}
                        0
                [2]
                    Category channel should be closed and the content should be invisible
`;
