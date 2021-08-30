/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            sidebar: init with one pinned channel
        [Test/model]
            DiscussComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                {Dev/comment}
                    channel that is expected to be found in the sidebar
                    with a random unique id that will be referenced in the test
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
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{=}
                        @testEnv
                        .{Env/inbox}
                [2]
                    The Inbox is opened in discuss
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Thread/id]
                        ]   20
                        [Thread/model]
                            mail.channel
                    .{Thread/discussSidebarCategoryItemComponent}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have the only channel of which user is member in discuss sidebar
`;
