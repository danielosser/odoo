/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            failure on loading more messages should display error and prompt retry button
        [Test/model]
            ThreadViewComponent
        [Test/assertions]
            3
        [Test/scenario]
            {Dev/comment}
                first call needs to be successful as it is the initial loading of messages
                second call comes from load more and needs to fail in order to show the error alert
                any later call should work so that retry button and load more clicks would now work
            :messageFetchShouldFail
                false
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        channel
                    [mail.channel/id]
                        20
                    [mail.channel/is_pinned]
                        true
                    [mail.channel/name]
                        General
                {foreach}
                    {Record/insert}
                        [Record/traits]
                            Range
                        [start]
                            0
                        [end]
                            60
                .{as}
                    id
                .{do}
                    []
                        [Record/traits]
                            mail.message
                        [mail.message/body]
                            coucou
                        [mail.message/id]
                            @id
                        [mail.message/model]
                            mail.channel
                        [mail.message/res_id]
                            20
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
                                .{=}
                                    /mail/channel/messages
                            .{then}
                                {if}
                                    @messageFetchShouldFail
                                .{then}
                                    {Error/raise}
                            @original
            :thread
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
            :threadViewer
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        ThreadViewer
                    [ThreadViewer/hasThreadView]
                        true
                    [ThreadViewer/thread]
                        @thread
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ThreadViewComponent
                [ThreadViewComponent/threadView]
                    @threadViewer
                    .{ThreadViewer/threadView}
            :messageFetchShouldFail
                true
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @threadViewer
                        .{ThreadViewer/threadView}
                        .{ThreadView/messageListComponents}
                        .{Collection/first}
                        .{MessageListComponent/loadMore}
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{threadView/threadViewComponents}
                    .{Collection/first}
                    .{ThreadViewComponent/alertLoadingFailed}
                [2]
                    should show loading error message
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{threadView/threadViewComponents}
                    .{Collection/first}
                    .{ThreadViewComponent/alertLoadingFailedRetryButton}
                [2]
                    should show loading error message button
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/messageListComponents}
                    .{Collection/first}
                    .{MessageListComponent/loadMore}
                    .{isFalsy}
                [2]
                    should not show load more buttton
`;
