/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            headerButtonDownload
        [Element/model]
            AttachmentViewerComponent
        [Model/traits]
            AttachmentViewerComponent/headerItem
            AttachmentViewerComponent/headerItemButton
        [Element/onClick]
            {web.Event/stopPropagation}
                @ev
            {AttachmentViewerComponent/_download}
                @record
        [web.Element/role]
            button
        [web.Element/title]
            {Locale/text}
                Download
`;
