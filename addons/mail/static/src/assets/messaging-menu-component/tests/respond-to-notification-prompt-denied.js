/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            respond to notification prompt (denied)
        [Test/model]
            MessagingMenuComponent
        [Test/assertions]
            4
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/owlEnv]
                        [browser]
                            [Notification]
                                [permission]
                                    default
                                [requestPermission]
                                    ${
                                        () => {
                                            return function() {
                                                this.permission = 'denied';
                                                return this.permission;
                                            }
                                        }
                                    }
                        [services]
                            [notification]
                                [notify]
                                    {func}
                                        {Test/step}
                                            should display a toast notification with the deny confirmation
            @testEnv
            .{Record/insert}
                [Record/traits]
                    MessagingMenuComponent
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
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
                        .{NotificationListComponent/notificationRequest}
            {Test/verifySteps}
                should display a toast notification with the deny confirmation
            {Test/assert}
                []
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/counter}
                    .{isFalsy}
                []
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
                []
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/notificationList}
                    .{NotificationListComponent/notificationRequest}
                    .{isFalsy}
                []
                    should display no notification in the messaging menu
`;
