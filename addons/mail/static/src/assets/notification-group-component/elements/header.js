/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            header
        [Element/model]
            NotificationGroupComponent
        [Model/traits]
            NotificationListItemComponent/header
`;
