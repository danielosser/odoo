/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            open / close
        [Test/model]
            ChatWindowManagerComponent
        [Test/assertions]
            10
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
                                    rpc:channel_fold/
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
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/length}
                    .{=}
                        0
                []
                    should not have a chat window initially

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
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have a chat window after clicking on thread preview
            {Test/verifySteps}
                []
                    rpc:channel_fold/open
                []
                    should sync fold state 'open' with server after opening chat window

            {Dev/comment}
                Close chat window
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{ChatWindowManager/chatWindows}
                        .{Collection/first}
                        .{ChatWindow/chatWindowHeaderComponents}
                        .{Collection/first}
                        .{ChatWindowHeaderComponent/commandClose}
            {Test/assert}
                []
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/length}
                    .{=}
                        0
                []
                    should not have a chat window after closing it
            {Test/verifySteps}
                []
                    rpc:channel_fold/closed
                []
                    should sync fold state 'closed' with server after closing chat window

            {Dev/comment}
                Reopen chat window
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
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have a chat window again after clicking on thread preview again
            {Test/verifySteps}
                []
                    rpc:channel_fold/open
                []
                    should sync fold state 'open' with server after opening chat window again
`;
