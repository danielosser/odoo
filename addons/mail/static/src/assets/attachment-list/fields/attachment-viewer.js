/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the attachment viewers displaying this attachment list (if any).
    {Field}
        [Field/name]
            attachmentViewer
        [Field/model]
            AttachmentList
        [Field/type]
            o2m
        [Field/target]
            AttachmentViewer
        [Field/isCausal]
            true
        [Field/inverse]
            AttachmentViewer/attachmentList
`;
