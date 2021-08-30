/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            image
        [Element/model]
            ThreadNeedactionPreviewComponent
        [web.Element/tag]
            img
        [Model/traits]
            NotificationListItemComponent/image
        [web.Element/src]
            {ThreadNeedactionPreviewComponent/getImage}
                @record
        [web.Element/alt]
            {Locale/text}
                Thread Image
`;
