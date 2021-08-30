/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            content
        [Element/model]
            NotificationGroupComponent
        [Model/traits]
            NotificationListItemComponent/content
`;
