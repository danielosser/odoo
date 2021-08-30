/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/action]
            MessageViewComponent/_onClickNotificationIconFailure
        [ActionAddon/feature]
            snailmail
        [ActionAddon/params]
            record
        [ActionAddon/behavior]
            {if}
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
                .{Message/type}
                .{=}
                    snailmail
            .{then}
                {Dev/comment}
                    Messages from snailmail are considered to have at
                    most one notification. The failure type of the
                    whole message is considered to be the same as the
                    one from that first notification, and the click
                    action will depend on it.
                {switch}
                    @record
                    .{MessageViewComponent/messageView}
                    .{MessageView/message}
                    .{Message/notifications}
                    .{Collection/first}
                    .{Notification/failureType}
                .{case}
                    [sn_credit]
                        {Dev/comment}
                            URL only used in this component,
                            not received at init
                        {Env/fetchSnailmailCreditsUrl}
                        {Record/update}
                            [0]
                                @record
                            [1]
                                [MessageViewComponent/hasSnailmailDialog]
                                    true
                    [sn_error]
                        {Record/update}
                            [0]
                                @record
                            [1]
                                [MessageViewComponent/hasSnailmailDialog]
                                    true
                    [sn_fields]
                        {Message/openMissingFieldsLetterAction}
                            @record
                            .{MessageViewComponent/messageView}
                            .{MessageView/message}
                    [sn_format]
                        {Message/openFormatLetterAction}
                            @record
                            .{MessageViewComponent/messageView}
                            .{MessageView/message}
                    [sn_price]
                        {Record/update}
                            [0]
                                @record
                            [1]
                                [MessageViewComponent/hasSnailmailDialog]
                                    true
                    [sn_trial]
                        {Dev/comment}
                            URL only used in this component, not
                            received at init
                        {Env/fetchSnailmailCreditsUrlTrial}
                        {Record/update}
                            [0]
                                @record
                            [1]
                                [MessageViewComponent/hasSnailmailDialog]
                                    true
            .{else}
                @original
`;
