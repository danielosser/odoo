/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            partialListNonImages
        [Element/model]
            AttachmentListComponent
        [Model/traits]
            AttachmentListComponent/partialList
        [web.Element/style]
            [web.scss/margin]
                {scss/map-get}
                    {scss/$spacers}
                    1
            [web.scss/justify-content]
                flex-start
`;
