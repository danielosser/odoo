/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            attachmentBox
        [Element/model]
            ChatterComponent
        [Field/target]
            AttachmentBoxComponent
        [Element/isPresent]
            @record
            .{ChatterComponent/chatter}
            .{Chatter/attachmentBoxView}
        [Element/props]
            [AttachmentBoxComponent/attachmentBoxView]
                @record
                .{ChatterComponent/chatter}
                .{Chatter/attachmentBoxView}
`;
