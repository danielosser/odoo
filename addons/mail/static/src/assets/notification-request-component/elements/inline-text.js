/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inlineText
        [Element/model]
            NotificationRequestComponent
        [web.Element/tag]
            span
        [Model/traits]
            NotificationListItemComponent/coreItem
            NotificationListItemComponent/inlineText
        [web.Element/textContent]
            {Locale/text}
                Enable desktop notifications to chat.
`;
