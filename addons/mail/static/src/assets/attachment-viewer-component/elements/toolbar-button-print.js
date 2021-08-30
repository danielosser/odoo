/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            toolbarButtonPrint
        [Element/model]
            AttachmentViewerComponent
        [Model/traits]
            AttachmentViewerComponent/toolbarButton
        [Element/onClick]
            {web.Event/stopPropagation}
                @ev
            {AttachmentViewerComponent/_print}
                @record
        [web.Element/title]
            {Locale/text}
                Print
        [web.Element/role]
            button
`;
