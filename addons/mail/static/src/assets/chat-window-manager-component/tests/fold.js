/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            fold
        [Test/model]
            ChatWindowManagerComponent
        [Test/assertions]
            9
        [Test/scenario]
            {Dev/comment}
                channel that is expected to be found in the messaging menu
                with random UUID, will be asserted during the test
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    mail.channel
                [mail.channel/uuid]
                    channel-uuid
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
                                @args
                                .{Dict/get}
                                    method
                                .{=}
                                    channel_fold
                            .{then}
                                {Test/step}
                                    rpc:
                                    .{+}
                                        @args
                                        .{Dict/get}
                                            method
                                    .{+}
                                        /
                                    .{+}
                                        @args
                                        .{Dict/get}
                                            kwargs
                                        .{Dict/get}
                                            state
                            @original
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        ChatWindowManagerComponent
                []
                    [Record/traits]
                        MessagingMenuComponent
            {Dev/comment}
                Open Thread
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/toggler}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/notificationList}
                        .{NotificationListComponent/threadPreview}
                        .{Collection/first}
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/first}
                    .{ChatWindow/chatWindowComponents}
                    .{Collection/first}
                    .{ChatWindowComponent/thread}
                []
                    chat window should have a thread
            {Test/verifySteps}
                []
                    rpc:channel_fold/open
                []
                    should sync fold state 'open' with server after opening chat window

            {Dev/comment}
                Fold chat window
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{ChatWindowManager/chatWindows}
                        .{Collection/first}
                        .{ChatWindow/chatWindowComponents}
                        .{Collection/first}
                        .{ChatWindowComponent/header}
            {Test/verifySteps}
                []
                    rpc:channel_fold/folded
                []
                    should sync fold state 'folded' with server after folding chat window
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/first}
                    .{ChatWindow/chatWindowComponents}
                    .{Collection/first}
                    .{ChatWindowComponent/thread}
                    .{isFalsy}
                []
                    chat window should not have any thread

            {Dev/comment}
                Unfold chat window
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{ChatWindowManager/chatWindows}
                        .{Collection/first}
                        .{ChatWindow/chatWindowComponents}
                        .{Collection/first}
                        .{ChatWindowComponent/header}
            {Test/verifySteps}
                []
                    rpc:channel_fold/open
                []
                    should sync fold state 'open' with server after unfolding chat window
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/first}
                    .{ChatWindow/chatWindowComponents}
                    .{Collection/first}
                    .{ChatWindowComponent/thread}
                []
                    chat window should have a thread
`;
