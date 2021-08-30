/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            notificationNonFailure
        [Element/model]
            MessageViewComponent
        [Field/target]
            Popover
        [Element/isPresent]
            @record
            .{MessageViewComponent/threadView}
            .{&}
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
                .{Message/originThread}
            .{&}
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
                .{message/originThread}
                .{=}
                    @record
                    .{MessageViewComponent/threadView}
                    .{ThreadView/thread}
            .{&}
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
                .{Message/notifications}
                .{Collection/length}
                .{>}
                    0
            .{&}
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
                .{Message/failureNotifications}
                .{Collection/length}
                .{=}
                    0
        [Element/slot]
            {qweb}
                ${
                    `
                        <span class="o-MessageViewComponent-notificationIconClickable">
                            <i
                                name="notificationIcon"
                                class="o-MessageViewComponent-notificationIcon fa fa-envelope-o"
                            />
                        </span>
                        <t t-set="opened">
                            <NotificationPopoverComponent
                                notifications="${
                                    Define`
                                        @record
                                        .{MessageViewComponent/messageView}
                                        .{MessageView/message}
                                        .{Message/notifications}
                                    `
                                }"
                            />
                        </t>
                    `
                }
`;
