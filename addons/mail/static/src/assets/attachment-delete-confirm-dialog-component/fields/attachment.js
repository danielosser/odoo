/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachment
        [Field/model]
            AttachmentDeleteConfirmDialogComponent
        [Field/type]
            m2o
        [Field/target]
            Attachment
        [Field/isRequired]
            true
`;
