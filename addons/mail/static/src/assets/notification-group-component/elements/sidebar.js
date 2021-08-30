/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            sidebar
        [Element/model]
            NotificationGroupComponent
        [Model/traits]
            NotificationListItemComponent/sidebar
`;
