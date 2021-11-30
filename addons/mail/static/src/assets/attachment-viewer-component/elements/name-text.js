/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            nameText
        [Element/model]
            AttachmentViewerComponent
        [web.Element/tag]
            span
        [web.Element/class]
            text-truncate
        [web.Element/textContent]
            @record
            .{AttachmentViewerComponent/record}
            .{AttachmentViewer/attachment}
            .{Attachment/displayName}
`;
