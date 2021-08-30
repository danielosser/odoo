/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            imageContainer
        [Element/model]
            ThreadNeedactionPreviewComponent
        [Model/traits]
            NotificationListItemComponent/imageContainer
`;
