/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            toolbarButtonPrintIcon
        [Element/model]
            AttachmentViewerComponent
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            fa-fw
            fa-print
        [web.Element/role]
            img
`;
