/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            Missing Required Fields
        [Test/feature]
            snailmail
        [Test/model]
            MessageViewComponent
        [Test/assertions]
            8
        [Test/scenario]
            :bus
                {Record/insert}
                    [Record/traits]
                        Bus
            {Bus/on}
                [0]
                    @bus
                [1]
                    do-action
                [2]
                    null
                [3]
                    {func}
                        [in]
                            payload
                        [out]
                            {Test/step}
                                do_action
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        action
                                    .{=}
                                        snailmail.snailmail_letter_missing_required_fields_action
                                []
                                    action should be the one for missing fields
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        options
                                    .{Dict/get}
                                        additional_context
                                    .{Dict/get}
                                        default_letter_id
                                    .{=}
                                        22
                                []
                                    action should have correct letter id
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/owlEnv]
                        [bus]
                            @bus
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        not empty
                    [mail.message/id]
                        10
                        {Dev/comment}
                            random unique id, useful to link letter and notification
                    [mail.message/message_type]
                        snailmail
                    [mail.message/res_id]
                        20
                        {Dev/comment}
                            non 0 id, necessary to fetch failure at init
                    [mail.message/model]
                        res.partner
                        {Dev/comment}
                            not mail.compose.message, necessary to fetch failure at init
                []
                    [Record/traits]
                        mail.notification
                    [mail.notification/failure_type]
                        sn_fields
                    [mail.notification/mail_message_id]
                        10
                    [mail.notification/notification_status]
                        exception
                    [mail.notification/notification_type]
                        snail
                []
                    [Record/traits]
                        snailmail.letter
                    [snailmail.letter/id]
                        22
                        {Dev/comment}
                            random unique id, will be asserted in the test
                    [snailmail.letter/message_id]
                        10
                        {Dev/comment}
                            id of related message
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :threadViewer
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        ThreadViewer
                    [ThreadViewer/hasThreadView]
                        true
                    [ThreadViewer/thread]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Thread
                            [Thread/id]
                                20
                            [Thread/model]
                                res.partner
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ThreadViewComponent
                [ThreadViewComponent/threadView]
                    @threadViewer
                    .{ThreadViewer/threadView}
            {Test/assert}
                []
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should display a message component
            {Test/assert}
                []
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/notificationIconClickable}
                []
                    should display the notification icon container
            {Test/assert}
                []
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/notificationIcon}
                []
                    should display the notification icon
            {Test/assert}
                []
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/notificationIconSnailmail}
                []
                    icon should represent snailmail

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @threadViewer
                        .{ThreadViewer/threadView}
                        .{ThreadView/thread}
                        .{Thread/cache}
                        .{ThreadCache/messages}
                        .{Collection/first}
                        .{Message/messageComponents}
                        .{Collection/first}
                        .{MessageViewComponent/notificationIconClickable}
            {Test/verifySteps}
                []
                    do_action
                []
                    an action should be done to display the missing fields dialog
`;
