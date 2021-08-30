/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            attachmentList
        [Element/model]
            MessageViewComponent
        [Field/target]
            AttachmentListComponent
        [Element/isPresent]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/attachmentList}
        [Element/props]
            [AttachmentListComponent/attachmentList]
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/attachmentList}
`;
