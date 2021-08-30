/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the dialog displaying this attachment viewer.
    {Field}
        [Field/name]
            dialog
        [Field/model]
            AttachmentViewer
        [Field/type]
            o2o
        [Field/target]
            Dialog
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            Dialog/attachmentViewer
`;
