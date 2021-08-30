/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonNavigationPreviousIcon
        [Element/model]
            AttachmentViewerComponent
        [web.Element/tag]
            span
        [web.Element/class]
            fa
            fa-chevron-left
        [web.Element/role]
            img
`;
