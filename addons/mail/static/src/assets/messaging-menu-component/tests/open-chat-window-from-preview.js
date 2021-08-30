/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            open chat window from preview
        [Test/model]
            MessagingMenuComponent
        [Test/assertions]
            1
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                {Dev/comment}
                    channel expected to be found in the menu, only its existence matters, data are irrelevant
                [Record/traits]
                    mail.channel
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        MessagingMenuComponent
                []
                    [Record/traits]
                        ChatWindowManagerComponent
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
                [0]
                    @record
                [1]
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have open a chat window
`;
