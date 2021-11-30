/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            chat - command: should not have add command when category is folded
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
                [Record/traits]
                    res.users.settings
                [res.users.settings/user_id]
                    @record
                    .{Test/data}
                    .{Data/currentUserId}
                [res.users.settings/is_discuss_sidebar_category_chat_open]
                    false
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
                    .{Discuss/categoryChat}
                    .{DiscussSidebarCategory/hasAddCommand}
                    .{isFalsy}
                [1]
                    should not have add command when chat category is closed
`;
