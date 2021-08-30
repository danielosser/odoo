/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            attachmentList
        [Element/model]
            AttachmentBoxComponent
        [Field/target]
            AttachmentListComponent
        [Element/isPresent]
            @record
            .{AttachmentBoxComponent/attachmentBoxView}
            .{AttachmentBoxView/chatter}
            .{Chatter/attachmentList}
        [Element/props]
            [AttachmentListComponent/attachmentList]
                @record
                .{AttachmentBoxComponent/attachmentBoxView}
                .{AttachmentBoxView/chatter}
                .{Chatter/thread}
                .{Thread/attachmentList}
`;
