/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            header
        [Element/model]
            NotificationRequestComponent
        [Model/traits]
            NotificationListItemComponent/header
`;
