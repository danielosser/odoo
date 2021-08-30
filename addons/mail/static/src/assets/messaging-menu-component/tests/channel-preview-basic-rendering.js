/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            channel preview: basic rendering
        [Test/model]
            MessagingMenuComponent
        [Test/assertions]
            9
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    {Dev/comment}
                        channel that is expected to be found in the test
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        20
                        {Dev/comment}
                            random unique id, will be used to link message to channel
                    [mail.channel/name]
                        General
                        {Dev/comment}
                            random name, will be asserted in the test
                []
                    {Dev/comment}
                        message that is expected to be displayed in the test
                    [Record/traits]
                        mail.mesage
                    [mail.message/author_id]
                        7
                        {Dev/comment}
                            not current partner, will be asserted in the test
                    [mail.message/body]
                        <p>test</p>
                        {Dev/comment}
                            random body, will be asserted in the test
                    [mail.message/model]
                        mail.channel
                        {Dev/comment}
                            necessary to link message to channel
                    [mail.message/res_id]
                        20
                        {Dev/comment}
                            id of related channel
                []
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        7
                        {Dev/comment}
                            random unique id, to link message author
                    [res.partner/name]
                        Demo
                        {Dev/comment}
                            random name, will be asserted in the test
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
                    should have one preview
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
                    .{ThreadPreviewComponent/sidebar}
                [2]
                    preview should have a sidebar
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
                    .{ThreadPreviewComponent/content}
                [2]
                    preview should have some content
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
                    .{ThreadPreviewComponent/header}
                [2]
                    preview should have header in content
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
                    .{ThreadPreviewComponent/name}
                [2]
                    preview should have name in header of content
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
                    .{ThreadPreviewComponent/name}
                    .{web.Element/textContent}
                    .{=}
                        General
                [2]
                    preview should have name of channel
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
                        Demo: test
                [2]
                    preview should have message content as inline text of core content
`;
