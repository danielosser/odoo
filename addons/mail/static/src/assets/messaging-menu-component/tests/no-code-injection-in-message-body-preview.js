/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            no code injection in message body preview
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
                        <p><em>&shoulnotberaised</em><script>throw new Error('CodeInjectionError');</script></p>
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
                        You:&shoulnotberaisedthrownewError('CodeInjectionError');
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
