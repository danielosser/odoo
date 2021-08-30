/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            coreItem
        [Element/model]
            ThreadPreviewComponent
        [Model/traits]
            NotificationListItemComponent/coreItem
`;
