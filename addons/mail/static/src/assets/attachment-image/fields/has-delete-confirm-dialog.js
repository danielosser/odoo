/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the status of the delete confirm dialog (open/closed).
    {Field}
        [Field/name]
            hasDeleteConfirmDialog
        [Field/model]
            AttachmentImage
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
