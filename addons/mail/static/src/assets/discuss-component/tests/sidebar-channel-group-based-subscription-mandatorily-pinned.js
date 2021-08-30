/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            sidebar: channel group_based_subscription: mandatorily pinned
        [Test/model]
            DiscussComponent
        [Test/assertions]
            2
        [Test/scenario]
            {Dev/comment}
                FIXME: The following is admittedly odd.
                Fixing it should entail a deeper reflexion on the
                group_based_subscription and is_pinned functionalities,
                especially in python.
                task-2284357
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                {Dev/comment}
                    channel that is expected to be found in the sidebar
                [Record/traits]
                    mail.channel
                [mail.channel/group_based_subscription]
                    true
                    {Dev/comment}
                        expected value for this test
                [mail.channel/id]
                    20
                    {Dev/comment}
                        random unique id, will be referenced in the test
                [mail.channel/is_pinned]
                    false
                    {Dev/comment}
                        expected value for this test
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
                    .{Record/findById}
                        [Thread/id]
                            20
                        [Thread/model]
                            mail.channel
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    the channel #General is in discuss sidebar
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Thread/id]
                            20
                        [Thread/model]]
                            mail.channel
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/commandLeave}
                    .{isFalsy}
                [2]
                    the group_based_subscription channel is not unpinnable
`;
