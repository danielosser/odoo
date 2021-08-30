/** @odoo-module **/

import { Define } from '@mail/define';

import Dialog from 'web.OwlDialog';

export default Define`
    {Model}
        [Model/name]
            AttachmentDeleteConfirmDialogComponent
        [Model/components]
            ${Dialog}
        [Model/fields]
            attachment
        [Model/template]
            root
`;
