/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            toolbarButtonZoomIn
        [Element/model]
            AttachmentViewerComponent
        [Model/traits]
            AttachmentViewerComponent/toolbarButton
        [Element/onClick]
            {web.Event/stopPropagation}
                @ev
            {AttachmentViewerComponent/_zoomIn}
                @record
        [web.Element/title]
            {Locale/text}
                Zoom In (+)
        [web.Element/role]
            button
`;
