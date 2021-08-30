/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            no code injection in message body preview from sanitized message
        [Test/model]
            MessagingMenuComponent
        [Test/assertions]
            5
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
                []
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        <p>&lt;em&gt;&shoulnotberaised&lt;/em&gt;&lt;script&gt;throw new Error('CodeInjectionError');&lt;/script&gt;</p>
                    [mail.message/model]
                        mail.channel
                    [mail.message/id]
                        11
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
                    .{NotificationListComponent/threadPreview}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should display a preview
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/notificationList}
                    .{NotificationListComponent/threadPreview}
                    .{Collection/first}
                    .{ThreadPreviewComponent/core}
                [2]
                    preview should have core in content
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/notificationList}
                    .{NotificationListComponent/threadPreview}
                    .{Collection/first}
                    .{ThreadPreviewComponent/inlineText}
                [2]
                    preview should have inline text in core of content
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/notificationList}
                    .{NotificationListComponent/threadPreview}
                    .{Collection/first}
                    .{ThreadPreviewComponent/inlineText}
                    .{web.Element/textContent}
                    .{=}
                        You:<em>&shoulnotberaised</em><script>thrownewError('CodeInjectionError');</script>
                [2]
                    should display correct uninjected last message inline content
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/notificationList}
                    .{NotificationListComponent/threadPreview}
                    .{Collection/first}
                    .{ThreadPreviewComponent/inlineText}
                    .{web.Element/htmlContent}
                    .{String/includes}
                        <script>
                    .{isFalsy}
                [2]
                    last message inline content should not have any code injection
`;
