/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            headerButtonDownloadIcon
        [Element/model]
            AttachmentViewerComponent
        [web.Element/tag]
            i
        [Model/traits]
            AttachmentViewerComponent/headerItemButtonIcon
        [web.Element/class]
            fa
            fa-download
            fa-fw
        [web.Element/role]
            img
`;
