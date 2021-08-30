/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            rendering of inbox message
        [Test/model]
            DiscussComponent
        [Test/assertions]
            8
        [Test/scenario]
            {Dev/comment}
                AKU TODO: kinda message specific test
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
                        res.partner
                        {Dev/comment}
                            random existing model
                    [mail.message/needaction]
                        true
                    [mail.message/needaction_partner_ids]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
                        {Dev/comment}
                            for consistency
                    [mail.message/record_name]
                        Refactoring
                        {Dev/comment}
                            random name, will be asserted in the test
                    [mail.message/res_id]
                        20
                        {Dev/comment}
                            random related id
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
                    should display a message
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
                    .{MessageViewComponent/originThread}
                [2]
                    should display origin thread of message
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
                    .{MessageViewComponent/originThread}
                    .{web.Element/textContent}
                    .{=}
                         on Refactoring
                [2]
                    should display origin thread name
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/actionList}
                    .{MessageActionList/messageActionListComponents}
                    .{Collection/first}
                    .{MessageActionListComponent/action}
                    .{Collection/length}
                    .{=}
                        4
                [2]
                    should display 4 actions
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/actionList}
                    .{MessageActionList/messageActionListComponents}
                    .{Collection/first}
                    .{MessageActionListComponent/actionReaction}
                [2]
                    should have action to add a reaction
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/actionList}
                    .{MessageActionList/messageActionListComponents}
                    .{Collection/first}
                    .{MessageActionListComponent/actionStar}
                [2]
                    should display star action
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/actionList}
                    .{MessageActionList/messageActionListComponents}
                    .{Collection/first}
                    .{MessageActionListComponent/actionReply}
                [2]
                    should display reply action
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/actionList}
                    .{MessageActionList/messageActionListComponents}
                    .{Collection/first}
                    .{MessageActionListComponent/actionMarkAsRead}
                [2]
                    should display mark as read action
`;
