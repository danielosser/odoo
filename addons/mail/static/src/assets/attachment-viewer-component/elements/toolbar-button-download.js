/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            toolbarButtonDownload
        [Element/model]
            AttachmentViewerComponent
        [Model/traits]
            AttachmentViewerComponent/toolbarButton
        [Element/onClick]
            {web.Event/stopPropagation}
                @ev
            {AttachmentViewerComponent/_download}
                @record
        [web.Element/title]
            {Locale/text}
                Download
        [web.Element/role]
            button
`;
