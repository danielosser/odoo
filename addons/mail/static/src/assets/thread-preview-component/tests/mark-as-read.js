/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            mark as read
        [Test/model]
            ThreadPreviewComponent
        [Test/assertions]
            8
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        11
                    [mail.channel/message_unread_counter]
                        1
                []
                    [Record/traits]
                        mail.message
                    [mail.message/id]
                        100
                    [mail.message/model]
                        mail.channel
                    [mail.message/res_id]
                        11
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
                [Server/mockRPC]
                    {func}
                        [in]
                            route
                            args
                            original
                        [out]
                            {if}
                                @route
                                .{String/includes}
                                    set_last_seen_message
                            .{then}
                                {Test/step}
                                    set_last_seen_message
                            @original
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ChatWindowManagerComponent
            :thread
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        11
                    [Thread/model]
                        mail.channel
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ThreadPreviewComponent
                [ThreadPreviewComponent/thread]
                    @thread
            {Test/assert}
                []
                    @thread
                    .{Thread/threadPreviewComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have the mark as read button
            {Test/assert}
                []
                    @thread
                    .{Thread/threadPreviewComponents}
                    .{Collection/first}
                    .{ThreadPreviewComponent/counter}
                []
                    should have an unread counter

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @thread
                        .{Thread/threadPreviewComponents}
                        .{Collection/first}
                        .{ThreadPreviewComponent/markAsRead}
            {Test/verifySteps}
                []
                    set_last_seen_message
                []
                    should have marked the thread as seen
            {Test/assert}
                []
                    @thread
                    .{Thread/localMessageUnreadCounter}
                    .{=}
                        0
                []
                    should be muted once marked as read
            {Test/assert}
                []
                    @thread
                    .{Thread/threadPreviewComponents}
                    .{Collection/first}
                    .{ThreadPreviewComponent/markAsRead}
                    .{isFalsy}
                []
                    should no longer have the mark as read button
            {Test/assert}
                []
                    @thread
                    .{Thread/threadPreviewComponents}
                    .{Collection/first}
                    .{ThreadPreviewComponent/counter}
                []
                    should no longer have an unread counter
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/length}
                    .{=}
                        0
                []
                    should not have opened the thread
`;
