/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            preview should display last needaction message preview even if there is a more recent message that is not needaction in the thread
        [Test/model]
            ThreadNeedactionPreviewComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.message
                    [mail.message/author_id]
                        11
                    [mail.message/body]
                        I am the oldest but needaction
                    [mail.message/id]
                        21
                    [mail.message/model]
                        res.partner
                    [mail.message/needaction]
                        true
                    [mail.message/needaction_partner_ids]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
                    [mail.message/res_id]
                        11
                []
                    [Record/traits]
                        mail.message
                    [mail.message/author_id]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
                    [mail.message/body]
                        I am more recent
                    [mail.message/id]
                        22
                    [mail.message/model]
                        res.partner
                    [mail.message/res_id]
                        11
                []
                    [Record/traits]
                        mail.notification
                    [mail.notification/mail_message_id]
                        21
                    [mail.notification/notification_status]
                        sent
                    [mail.notification/notification_type]
                        inbox
                    [mail.notification/res_partner_id]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
                []
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        11
                    [res.partner/name]
                        Stranger
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
                        ChatWindowManagerComponent
                []
                    [Record/traits]
                        MessagingMenuComponent
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/afterEvent}
                        [eventName]
                            o-thread-cache-loaded-messages
                        [func]
                            @testEnv
                            .{UI/click}
                                @testEnv
                                .{MessagingMenu/messagingMenuComponents}
                                .{Collection/first}
                                .{MessagingMenuComponent/toggler}
                        [message]
                            should wait until inbox loaded initial needaction messages
                        [predicate]
                            {func}
                                [in]
                                    threadCache
                                [out]
                                    @threadCache
                                    .{ThreadCache/thread}
                                    .{Thread/model}
                                    .{=}
                                        mail.box
                                    .{&}
                                        @threadCache
                                        .{ThreadCache/thread}
                                        .{Thread/id}
                                        .{=}
                                            inbox
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/notificationList}
                    .{NotificationListComponent/threadNeedactionPreview}
                    .{Collection/first}
                    .{ThreadNeedactionPreviewComponent/inlineText}
                [2]
                    should have a preview from the last message
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/notificationList}
                    .{NotificationListComponent/threadNeedactionPreview}
                    .{Collection/first}
                    .{ThreadNeedactionPreviewComponent/inlineText}
                    .{web.Element/textContent}
                    .{=}
                        Stranger: I am the oldest but needaction
                [2]
                    the displayed message should be the one that needs action even if there is a more recent message that is not needaction on the thread
`;
