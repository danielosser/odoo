/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            viewText
        [Element/model]
            AttachmentViewerComponent
        [web.Element/tag]
            iframe
        [Model/traits]
            AttachmentViewerComponent/view
            AttachmentViewerComponent/viewIframe
        [Element/isPresent]
            @record
            .{AttachmentViewerComponent/record}
            .{AttachmentViewer/attachment}
            .{Attachment/isTextFile}
        [web.Element/src]
            @record
            .{AttachmentViewerComponent/record}
            .{AttachmentViewer/attachment}
            .{Attachment/defaultSource}
        [web.Element/style]
            [web.scss/background-color]
                {scss/$white}
`;
