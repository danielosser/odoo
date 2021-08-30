/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            fileUploader
        [Element/model]
            AttachmentBoxComponent
        [Field/target]
            FileUploaderComponent
        [Field/inverse]
            FileUploaderComponent/attachmentBoxComponents
        [Element/props]
            [FileUploaderComponent/thread]
                @record
                .{AttachmentBoxComponent/chatter}
                .{Chatter/thread}
`;
