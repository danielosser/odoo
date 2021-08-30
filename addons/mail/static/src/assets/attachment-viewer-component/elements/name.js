/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            name
        [Element/model]
            AttachmentViewerComponent
        [Model/traits]
            AttachmentViewerComponent/headerItem
        [web.Element/style]
            [web.scss/margin]
                0
                {scss/map-get}
                    {scss/$spacers}
                    2
            [web.scss/min-width]
                0
`;
