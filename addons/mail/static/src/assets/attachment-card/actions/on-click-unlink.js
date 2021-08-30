/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Handles the click on delete attachment and open the confirm dialog.
    {Action}
        [Action/name]
            AttachmentCard/onClickUnlink
        [Action/params]
            ev
                [type]
                    web.MouseEvent
            record
                [type]
                    AttachmentCard
        [Action/behavior]
            {Dev/comment}
                prevents from opening viewer
            {web.Event/stopPropagation}
                @ev
            {if}
                @record
                .{AttachmentCard/attachmentList}
                .{AttachmentList/composerView}
            .{then}
                {Component/trigger}
                    [0]
                        @record
                        .{AttachmentCard/component}
                    [1]
                        o-attachment-removed
                    [2]
                        [attachment]
                            @record
                            .{AttachmentCard/attachment}
                {Attachment/remove}
                    @record
                    .{AttachmentCard/attachment}
            .{else}
                {Record/update}
                    [0]
                        @record
                    [1]
                        [AttachmentCard/hasDeleteConfirmDialog]
                            true
`;
