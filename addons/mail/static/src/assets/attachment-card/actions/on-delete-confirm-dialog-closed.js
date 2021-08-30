/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Synchronizes the 'hasDeleteConfirmDialog' when the dialog is closed.
    {Action}
        [Action/name]
            AttachmentCard/onDeleteConfirmDialogClosed
        [Action/params]
            record
                [type]
                    AttachmentCard
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
                    [AttachmentCard/hasDeleteConfirmDialog]
                        false
`;
