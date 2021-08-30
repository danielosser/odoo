/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            sidebar
        [Element/model]
            NotificationRequestComponent
        [Model/traits]
            NotificationListItemComponent/sidebar
`;
