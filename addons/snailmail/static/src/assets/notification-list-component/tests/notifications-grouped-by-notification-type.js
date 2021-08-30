/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            notifications grouped by notification_type
        [Test/feature]
            snailmail
        [Test/model]
            NotificationListComponent
        [Test/assertions]
            11
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
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
                        snail
                        {Dev/comment}
                            different type from second message
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
                            different type from first message
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
                            necessary value to have a failure
                    [mail.notification/notification_type]
                        snail
                        {Dev/comment}
                            different type from second failure
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
                        exception
                        {Dev/comment}
                            necessary value to have a failure
                    [mail.notification/notification_type]
                        email
                        {Dev/comment}
                            different type from first failure
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
                    NotificationListComponent
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
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
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
                    .{NotificationListComponent/group}
                    .{Collection/first}
                    .{NotificationGroupComponent/name}
                [2]
                    should have 1 group name in first group
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
                    .{NotificationListComponent/group}
                    .{Collection/first}
                    .{NotificationGroupComponent/name}
                    .{web.Element/textContent}
                    .{=}
                        Partner
                [2]
                    should have model name as group name
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
                    .{NotificationListComponent/group}
                    .{Collection/first}
                    .{NotificationGroupComponent/counter}
                [2]
                    should have 1 group counter in first group
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
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
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
                    .{NotificationListComponent/group}
                    .{Collection/first}
                    .{NotificationGroupComponent/inlineText}
                    .{web.Element/textContent}
                    .{=}
                        An error occurred when sending an email.
                [2]
                    should have the group text corresponding to email
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
                    .{NotificationListComponent/group}
                    .{Collection/second}
                    .{NotificationGroupComponent/name}
                [2]
                    should have 1 group name in second group
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
                    .{NotificationListComponent/group}
                    .{Collection/second}
                    .{NotificationGroupComponent/name}
                    .{web.Element/textContent}
                    .{=}
                        Partner
                [2]
                    should have second model name as group name
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
                    .{NotificationListComponent/group}
                    .{Collection/second}
                    .{NotificationGroupComponent/counter}
                [2]
                    should have 1 group counter in second group
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
                    .{NotificationListComponent/group}
                    .{Collection/second}
                    .{NotificationGroupComponent/counter}
                    .{web.Element/textContent}
                    .{=}
                        (1)
                [2]
                    should have 1 notification in second group
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            NotificationListComponent
                    .{Collection/first}
                    .{NotificationListComponent/group}
                    .{Collection/second}
                    .{NotificationGroupComponent/inlineText}
                    .{web.Element/textContent}
                    .{=}
                        An error occurred when sending a letter with Snailmail.
                [2]
                    should have the group text corresponding to snailmail
`;
