/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            notificationLabel
        [Element/feature]
            sms
        [Element/model]
            MessageViewComponent
        [web.Element/tag]
            span
        [Element/isPresent]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/message}
            .{Message/type}
            .{=}
                sms
        [web.Element/textContent]
            {Locale/text}
                SMS
`;
