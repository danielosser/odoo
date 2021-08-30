/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            headerItemButtonCloseIcon
        [Element/model]
            AttachmentViewerComponent
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            fa-fw
            fa-times
        [web.Element/role]
            img
`;
