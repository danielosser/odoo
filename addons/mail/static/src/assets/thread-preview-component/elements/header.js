/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            header
        [Element/model]
            ThreadPreviewComponent
        [Model/traits]
            NotificationListItemComponent/header
        [web.Element/class]
            align-items-baseline
`;
