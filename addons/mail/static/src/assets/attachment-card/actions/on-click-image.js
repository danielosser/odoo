/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Opens the attachment viewer when clicking on viewable attachment.
    {Action}
        [Action/name]
            AttachmentCard/onClickImage
        [Action/params]
            record
                [type]
                    AttachmentCard
        [Action/behavior]
            {if}
                @record
                .{AttachmentCard/attachment}
                .{Attachment/isViewable}
                .{isFalsy}
            .{then}
                {break}
            {Record/update}
                [0]
                    {Env/dialogManager}
                [1]
                    [DialogManager/dialogs]
                        {Field/add}
                            {Record/insert}
                                [Record/traits]
                                    Dialog
                                [Dialog/attachmentViewer]
                                    {Record/insert}
                                        [Record/traits]
                                            AttachmentViewer
                                        [AttachmentViewer/attachment]
                                            @record
                                            .{AttachmentCard/attachment}
                                        [AttachmentViewer/attachmentList]
                                            @record
                                            .{AttachmentCard/attachmentList}
`;
