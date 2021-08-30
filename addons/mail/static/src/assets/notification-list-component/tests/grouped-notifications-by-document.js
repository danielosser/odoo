/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            grouped notifications by document
        [Test/model]
            NotificationListComponent
        [Test/assertions]
            5
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                {Dev/comment}
                    If some failures linked to a document refers to a same document, a single
                    notification should group all those failures.
                []
                    {Dev/comment}
                        first message that is expected to have a failure
                    [Record/traits]
                        mail.message
                    [mail.message/id]
                        11
                        {Dev/comment}
                            random unique id, will be used to link failure to message
                    [mail.message/message_type]
                        email
                        {Dev/comment}
                            message must be email (goal of the test)
                    [mail.message/model]
                        res.partner
                        {Dev/comment}
                            same model as second message (and not 'mail.channel')
                    [mail.message/res_id]
                        31
                        {Dev/comment}
                            same res_id as second message
                    [mail.message/res_model_name]
                        Partner
                        {Dev/comment}
                            random related model name
                []
                    {Dev/comment}
                        second message that is expected to have a failure
                    [Record/traits]
                        mail.message
                    [mail.message/id]
                        12
                        {Dev/comment}
                            random unique id, will be used to link failure to message
                    [mail.message/message_type]
                        email
                        {Dev/comment}
                            message must be email (goal of the test)
                    [mail.message/model]
                        res.partner
                        {Dev/comment}
                            same model as first message (and not 'mail.channel')
                    [mail.message/res_id]
                        31
                        {Dev/comment}
                            same res_id as first message
                    [mail.message/res_model_name]
                        Partner
                        {Dev/comment}
                            same related model name for consistency
                []
                    {Dev/comment}
                        first failure that is expected to be used in the test
                    [Record/traits]
                        mail.notification
                    [mail.notification/mail_message_id]
                        11
                        {Dev/comment}
                            id of the related first message
                    [mail.notification/notification_status]
                        exception
                        {Dev/comment}
                            one possible value to have a failure
                    [mail.notification/notification_type]
                        email
                        {Dev/comment}
                            expected failure type for email message
                []
                    {Dev/comment}
                        second failure that is expected to be used in the test
                    [Record/traits]
                        mail.notification
                    [mail.notification/mail_message_id]
                        12
                        {Dev/comment}
                            id of the related second message
                    [mail.notification/notification_status]
                        bounce
                        {Dev/comment}
                            other possible value to have a failure
                    [mail.notification/notification_type]
                        email
                        {Dev/comment}
                            expected failure type for email message
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
                   ChatWindowManagerComponent
            :notificationListComponent
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        NotificationListComponent
            {Test/assert}
                [0]
                    @record
                [1]
                    @notificationListComponent
                    .{NotificationListComponent/group}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have 1 notification group
            {Test/assert}
                [0]
                    @record
                [1]
                    @notificationListComponent
                    .{NotificationListComponent/group}
                    .{Collection/first}
                    .{NotificationGroupComponent/counter}
                [2]
                    should have 1 group counter
            {Test/assert}
                [0]
                    @record
                [1]
                    @notificationListComponent
                    .{NotificationListComponent/group}
                    .{Collection/first}
                    .{NotificationGroupComponent/counter}
                    .{web.Element/textContent}
                    .{=}
                        (2)
                [2]
                    should have 2 notifications in the group
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/length}
                    .{=}
                        0
                [2]
                    should have no chat window initially

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @notificationListComponent
                        .{NotificationListComponent/group}
                        .{Collection/first}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{ChatWindowManager/chatWindows}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have opened the thread in a chat window after clicking on it
`;
