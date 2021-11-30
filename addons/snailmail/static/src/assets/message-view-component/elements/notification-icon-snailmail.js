/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            notificationIconSnailmail
        [Element/feature]
            snailmail
        [Element/model]
            MessageViewComponent
        [web.Element/tag]
            i
        [Model/traits]
            MessageViewComponent/notificationIcon
        [web.Element/class]
            fa
            fa-paper-plane
        [Element/isPresent]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/message}
            .{Message/type}
            =
            'snailmail'
`;
