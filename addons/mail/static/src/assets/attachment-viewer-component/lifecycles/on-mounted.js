/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onMounted
        [Lifecycle/model]
            AttachmentViewerComponent
        [Lifecycle/behavior]
            {UI/focus}
                @record
                .{AttachmentViewerComponent/root}
            {AttachmentViewerComponent/_handleImageLoad}
                @record
            {AttachmentViewerComponent/_hideUnwantedPdfJsButtons}
                @record
`;
