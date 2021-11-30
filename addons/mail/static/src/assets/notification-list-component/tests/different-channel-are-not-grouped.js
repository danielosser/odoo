/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            different channel are not grouped
        [Test/model]
            NotificationListComponent
        [Test/assertions]
            6
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                {Dev/comment}
                    'mail.channel' is a special case where notifications are not grouped when
                    they are linked to different channels, even though the model is the same.
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        31
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        32
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
                        mail.channel
                        {Dev/comment}
                            testing a channel is the goal of the test
                    [mail.message/res_id]
                        31
                        {Dev/comment}
                            different res_id from second message
                    [mail.message/res_model_name]
                        Channel
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
                        mail.channel
                        {Dev/comment}
                            testing a channel is the goal of the test
                    [mail.message/res_id]
                        32
                        {Dev/comment}
                            different res_id from first message
                    [mail.message/res_model_name]
                        Channel
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
                {Dev/comment}
                    needed to assert thread.open
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
                        2
                [2]
                    should have 2 notifications group
            {Test/assert}
                [0]
                    @record
                [1]
                    @notificationListComponent
                    .{NotificationListComponent/group}
                    .{Collection/first}
                    .{NotificationGroupComponent/counter}
                [2]
                    should have 1 group counter in first group
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
                        (1)
                [2]
                    should have 1 notification in first group
            {Test/assert}
                [0]
                    @record
                [1]
                    @notificationListComponent
                    .{NotificationListComponent/group}
                    .{Collection/second}
                    .{NotificationGroupComponent/counter}
                [2]
                    should have 1 group counter in second group
            {Test/assert}
                [0]
                    @record
                [1]
                    @notificationListComponent
                    .{NotificationListComponent/group}
                    .{Collection/second}
                    .{NotificationGroupComponent/counter}
                    .{web.Element/textContent}
                    .{=}
                        (1)
                [2]
                    should have 1 notification in second group

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
                    should have opened the channel related to the first group in a chat window
`;
