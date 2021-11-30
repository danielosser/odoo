/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            reply to message from inbox when message linked to document
        [Test/model]
            DiscussComponent
        [Test/assertions]
            19
        [Test/scenario]
            {Dev/comment}
                message that is expected to be found in Inbox
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/owlEnv]
                        [services]
                            [notification]
                                [notify]
                                    {func}
                                        [in]
                                            notification
                                        [out]
                                            {Test/assert}
                                                [0]
                                                    @record
                                                [1]
                                                    true
                                                [2]
                                                    should display a notification after posting reply
                                            {Test/assert}
                                                [0]
                                                    @record
                                                [1]
                                                    @notification
                                                    .{Dict/get}
                                                        message
                                                    .{=}
                                                        Message posted on "Refactoring"
                                                [2]
                                                    notification should tell that message has been posted to the record 'Refactoring'
            @testEnv
            .{Record/insert}
                [0]
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        <p>Test</p>
                    [mail.message/date]
                        2019-04-20 11:00:00
                    [mail.message/id]
                        {Dev/comment}
                            random unique id, will be used
                            to link notification to message
                        100
                    [mail.message/message_type]
                        comment
                    [mail.message/needaction]
                        true
                    [mail.message/model]
                        res.partner
                    [mail.message/record_name]
                        Refactoring
                    [mail.message/res_id]
                        20
                [1]
                    {Dev/comment}
                        notification to have message in Inbox
                    [Record/traits]
                        mail.notification
                    [mail.notification/mail_message_id]
                        100
                        {Dev/comment}
                            id of related message
                    [mail.notification/res_partner_id]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
                        {Dev/comment}
                            must be for current partner
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
                [Server/mockRPC]
                    {func}
                        [in]
                            route
                            args
                        [out]
                            {if}
                                @route
                                .{=}
                                    /mail/message/post
                            .{then}
                                {Test/step}
                                    message_post
                                {Test/assert}
                                    []
                                        @args
                                        .{Dict/get}
                                            thread_model
                                        .{=}
                                            res.partner
                                    []
                                        should post message to record with model 'res.partner'
                                {Test/assert}
                                    []
                                        @args
                                        .{Dict/get}
                                            thread_id
                                        .{=}
                                            20
                                    []
                                        should post message to record with Id 20
                                {Test/assert}
                                    []
                                        @args
                                        .{Dict/get}
                                            post_data
                                        .{Dict/get}
                                            body
                                        .{=}
                                            Test
                                    []
                                        should post with provided content in composer input
                                {Test/assert}
                                    []
                                        @args
                                        .{Dict/get}
                                            post_data
                                        .{Dict/get}
                                            message_type
                                        .{=}
                                            comment
                                    []
                                        should set message type as 'comment'
                            @original
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should display a single message
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{=}
                        @testEnv
                        .{Record/findById}
                            [Message/id]
                                100
                []
                    should display message with ID 100
            {Test/assert}
                []
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
                []
                    should display message originates from record 'Refactoring'

            @testEnv
            .{UI/click}
                @testEnv
                .{Discuss/thread}
                .{Thread/cache}
                .{ThreadCache/messages}
                .{Collection/first}
                .{Message/messageComponents}
                .{Collection/first}
            @testEnv
            .{UI/click}
                @testEnv
                .{Discuss/thread}
                .{Thread/cache}
                .{ThreadCache/messages}
                .{Collection/first}
                .{Message/actionList}
                .{MessageActionList/messageActionListComponents}
                .{Collection/first}
                .{MessageActionListComponent/actionReply}
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/isSelected}
                []
                    message should be selected after clicking on reply icon
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have composer after clicking on reply to message
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/first}
                    .{ComposerViewComponent/threadName}
                    .{web.Element/textContent}
                    .{=}
                         on: Refactoring
                []
                    composer should display origin thread name of message
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/Composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{=}
                        @testEnv
                        .{web.Browser/document}
                        .{web.Document/activeElement}
                []
                    composer text input should be auto-focus

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/insertText}
                        Test
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Discuss/thread}
                        .{Thread/composer}
                        .{Composer/composerViewComponents}
                        .{Collection/first}
                        .{ComposerViewComponent/buttonSend}
            {Test/verifySteps}
                message_post
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/length}
                    .{=}
                        0
                []
                    should no longer have composer after posting reply to message
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should still display a single message after posting reply
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{=}
                        @testEnv
                        .{Record/findById}
                            [Message/id]
                                100
                []
                    should still display message with ID 100 after posting reply
            {Test/assert}
                []
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/isSelected}
                    .{isFalsy}
                []
                    message should not longer be selected after posting reply
`;
