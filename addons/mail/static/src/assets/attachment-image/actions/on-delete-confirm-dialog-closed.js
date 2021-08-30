/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Synchronize the 'hasDeleteConfirmDialog' when the dialog is closed.
    {Action}
        [Action/name]
            AttachmentImage/onDeleteConfirmDialogClosed
        [Action/params]
            record
                [type]
                    AttachmentImage
        [Action/behavior]
            {if}
                {Record/exists}
                    @record
                .{isFalsy}
            .{then}
                {break}
            {Record/update}
                [0]
                    @record
                [1]
                    [AttachmentImage/hasDeleteConfirmDialog]
                        false
`;
