/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Close the dialog with this attachment viewer.
    {Action}
        [Action/name]
            AttachmentViewerComponent/_close
        [Action/params]
            record
        [Action/behavior]
            {AttachmentViewer/close}
                @record
                .{AttachmentViewerComponent/record}
`;
