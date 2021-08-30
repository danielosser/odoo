/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            image
        [Element/model]
            ThreadPreviewComponent
        [web.Element/tag]
            img
        [Model/traits]
            NotificationListItemComponent/image
        [web.Element/class]
            rounded-circle
        [web.Element/src]
            {ThreadPreviewComponent/getImage}
                @record
        [web.Element/alt]
            {Locale/text}
                Thread Image
`;
