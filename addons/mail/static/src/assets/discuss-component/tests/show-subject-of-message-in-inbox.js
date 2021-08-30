/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            show subject of message in Inbox
        [Test/model]
            DiscussComponent
        [Test/assertions]
            3
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        not empty
                    [mail.message/id]
                        100
                    [mail.message/model]
                        mail.channel 
                        {Dev/comment}
                            random existing model
                    [mail.message/needaction]
                        true
                    [mail.message/needaction_partner_ids]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId} 
                        {Dev/comment}
                            not needed, for consistency
                    [mail.message/subject]
                        Salutations, voyageur
                        {Dev/comment}
                            will be asserted in the test
                [1]
                    [Record/traits]
                        mail.notification
                    [mail.notification/mail_message_id]
                        100
                    [mail.notification/notification_status]
                        sent
                    [mail.notification/notification_type]
                        inbox
                    [mail.notification/res_partner_id]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
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
                    DiscussComponent
            @testEnv
            .{Utils/waitUntilEvent}
                [eventName]
                    o-thread-view-hint-processed
                [message]
                    should wait until inbox displayed its messages
                [predicate]
                    {func}
                        [in]
                            hint
                            threadViewer
                        [out]
                            @hint
                            .{Hint/type}
                            .{=}
                                messages-loaded
                            .{&}
                                @threadViewer
                                .{ThreadViewer/thread}
                                .{Thread/model}
                                .{=}
                                    mail.box
                            .{&}
                                @threadViewer
                                .{ThreadViewer/thread}
                                .{Thread/id}
                                .{=}
                                    inbox
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should display a single message
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/subject}
                [2]
                    should display subject of the message
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/subject}
                    .{web.Element/textContent}
                    .{=}
                        Subject: Salutations, voyageur
                [2]
                    Subject of the message should be 'Salutations, voyageur'
`;
