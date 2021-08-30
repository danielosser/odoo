/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            imageContainer
        [Element/model]
            NotificationGroupComponent
        [Model/traits]
            NotificationListItemComponent/imageContainer
`;
