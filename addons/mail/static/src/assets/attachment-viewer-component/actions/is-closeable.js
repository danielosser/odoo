/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Mandatory method for dialog components.
        Prevent closing the dialog when clicking on the mask when the user is
        currently dragging the image.
    {Action}
        [Action/name]
            AttachmentViewerComponent/isCloseable
        [Action/params]
            record
        [Action/behavior]
            @record
            .{AttachmentViewerComponent/isDragging}
            .{isFalsy}
`;
