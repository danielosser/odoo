/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachmentViewer
        [Field/model]
            Dialog
        [Field/type]
            o2o
        [Field/target]
            AttachmentViewer
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            AttachmentViewer/dialog
`;
