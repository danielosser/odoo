/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            content
        [Element/model]
            ThreadNeedactionPreviewComponent
        [Model/traits]
            NotificationListItemComponent/content
`;
