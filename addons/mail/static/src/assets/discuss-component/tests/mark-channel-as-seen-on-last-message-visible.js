/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            mark channel as seen on last message visible
        [Test/model]
            DiscussComponent
        [Test/isFocusRequired: true
        [Test/assertions]
            3
        [Test/scenario]
            {Dev/comment}
                channel expected to be found in the sidebar, with the expected
                message_unread_counter and a random unique id that will be
                referenced in the test
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
                        10
                    [mail.channel/message_unread_counter]
                        1
                [1]
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        not empty
                    [mail.message/id]
                        12
                    [mail.message/model]
                        mail.channel
                    [mail.message/res_id]
                        10
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
                            10
                        [Thread/model]
                            mail.channel
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have discuss sidebar item with the channel
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Thread/id]
                            10
                        [Thread/model]
                            mail.channel
                    .{Thread/localMessageUnreadCounter}
                    .{>}
                        0
                [2]
                    sidebar item of channel ID 10 should be unread

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/afterEvent}
                        [eventName]
                            o-thread-last-seen-by-current-partner-message-id-changed
                        [func]
                            @testEnv
                            .{UI/click}
                                @testEnv
                                .{Record/findById}
                                    [Thread/id]
                                        10
                                    [Thread/model]
                                        mail.channel
                                .{Thread/discussSidebarCategoryItemComponents}
                                .{Collection/first}
                        [message]
                            should wait until last seen by current partner message id changed
                        [predicate]
                            {func}
                                [in]
                                    thread
                                [out]
                                    @thread
                                    .{Thread/id}
                                    .{=}
                                        10
                                    .{&}
                                        @thread
                                        .{Thread/model}
                                        .{=}
                                            mail.channel
                                    .{&}
                                        @thread
                                        .{Thread/lastSeenByCurrentPartnerMessageId}
                                        .{=}
                                            12
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Thread/id]
                            10
                        [Thread/model]
                            mail.channel
                    .{Thread/localMessageUnreadCounter}
                    .{=}
                        0
                [2]
                    sidebar item of channel ID 10 should not longer be unread
`;
