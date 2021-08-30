/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            sidebar: unpin channel from bus
        [Test/model]
            DiscussComponent
        [Test/assertions]
            5
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
                    the Inbox is opened in discuss
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
                    1 channel is present in discuss sidebar and it is 'general'

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                20
                            [Thread/model]
                                mail.channel
                        .{Thread/discussSidebarCategoryItemComponents}
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
                    the channel #General is opened in discuss

            {Dev/comment}
                Simulate receiving a leave channel notification
                (e.g. from user interaction from another device or browser tab)
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{Env/owlEnv}
                    .{Dict/get}
                        services
                    .{Dict/get}
                        bus_service
                    .{Dict/get}
                        trigger
                    .{Function/call}
                        [0]
                            notification
                        [1]
                            {Record/insert}
                                [Record/traits]
                                    Collection
                                [type]
                                    mail.channel/unpin
                                [payload]
                                    [channel_type]
                                        channel
                                    [id]
                                        20
                                    [name]
                                        General
                                    [public]
                                        public
                                    [state]
                                        open
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{isFalsy}
                [2]
                    should have no thread opened in discuss
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
                    the channel must have been removed from discuss sidebar
`;
