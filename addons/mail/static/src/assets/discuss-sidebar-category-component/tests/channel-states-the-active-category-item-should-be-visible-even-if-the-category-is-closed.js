/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            channel - states: the active category item should be visble even if the category is closed
        [Test/model]
            DiscussSidebarCategoryComponent
        [Test/assertions]
            4
        [Test/scenario]
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
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
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
                        1

            :channel
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
                .{Thread/discussSidebarCategoryItemComponents}
                .{Collection/first}
            @testEnv
            .{UI/afterNextRender}
                @testEnv
                .{UI/click}
                    @channel
            {Test/assert}
                [0]
                    @record
                [1]
                    @channel
                    .{DiscussSidebarCategoryItemComponent/isActive}
        
            @testEnv
            .{UI/afterNextRender}
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
                    the active channel item should remain even if the category is folded
        
            @testEnv
            .{UI/afterNextRender}
                @testEnv
                .{UI/click}
                    @testEnv
                    .{Env/inbox}
                    .{Thread/discussSidebarMailboxComponents}
                    .{Collection/first}

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
                    inactive item should be invisible if the category is folded
`;
