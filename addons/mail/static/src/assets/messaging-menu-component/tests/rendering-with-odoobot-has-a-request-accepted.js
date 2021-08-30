/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            rendering without OdooBot has a request (accepted)
        [Test/model]
            MessagingMenuComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [env/owlEnv]
                        [browser]
                            [Notification]
                                [permission]
                                    granted
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
                    MessagingMenuComponent
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/counter}
                    .{isFalsy}
                [2]
                    should not display a notification counter next to the messaging menu

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/toggler}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/notificationList}
                    .{NotificationListComponent/notificationRequest}
                    .{isFalsy}
                [2]
                    should display no notification in the messaging menu
`;
