/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            dropZone
        [Element/model]
            AttachmentBoxComponent
        [Field/target]
            DropZoneComponent
        [Element/isPresent]
            @record
            .{AttachmentBoxComponent/dropzoneVisible}
            .{DropzoneVisibleComponentHook/value}
`;
