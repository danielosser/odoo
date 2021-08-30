/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            sidebar
        [Element/model]
            ThreadNeedactionPreviewComponent
        [Model/traits]
            NotificationListItemComponent/sidebar
`;
