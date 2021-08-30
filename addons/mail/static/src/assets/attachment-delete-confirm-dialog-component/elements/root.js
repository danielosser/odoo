/** @odoo-module **/

import { Define } from '@mail/define';

import Dialog from 'web.OwlDialog';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            AttachmentDeleteConfirmDialogComponent
        [Field/target]
            ${Dialog}
        [Element/props]
            [OwlDialog/contentClass]
                o-AttachmentDeleteConfirmDialogComponent
            [OwlDialog/title]
                {Locale/text}
                    Confirmation
            [OwlDialog/size]
                medium
        [Element/slot]
            {qweb}
                ${
                    `
                        <p class="o-AttachmentDeleteConfirmDialogComponent-mainText" t-esc="${
                            Define`
                                {String/sprintf}
                                    [0]
                                        {Locale/text}
                                            Do you really want to delete "%s"?
                                    [1]
                                        {String/escape}
                                            @record
                                            .{AttachmentDeleteConfirmDialogComponent/attachment}
                                            {Attachment/displayName}
                            `
                        }"/>
                        <t t-set-slot="buttons">
                            <button class="o-AttachmentDeleteConfirmDialogComponent-confirmButton btn btn-primary" t-on-click="${
                                Define`
                                    {Attachment/remove}
                                        @record
                                        .{AttachmentDeleteConfirmDialogComponent/attachment}
                                    {DialogComponent/_close}
                                        @record
                                        .{AttachmentDeleteConfirmDialogComponent/dialog}
                                    {if}
                                        @record
                                        .{AttachmentDeleteConfirmDialogComponent/attachmentBoxComponents}
                                    .{then}
                                        {foreach}
                                            @record
                                            .{AttachmentDeleteConfirmDialogComponent/attachmentBoxComponents}
                                        .{as}
                                            attachmentBoxComponent
                                        .{do}
                                            {Dev/comment}
                                                FIXME Could be changed by spying attachments count (task-2252858)
                                            {Component/trigger}
                                                @attachmentBoxComponent
                                                o-attachments-changed
                                `
                            }">Ok</button>
                            <button class="o-AttachmentDeleteConfirmDialogComponent-cancelButton btn btn-secondary" t-on-click="${
                                Define`
                                    {DialogComponent/_close}
                                        @record
                                        .{AttachmentDeleteConfirmDialogComponent/dialog}
                                `
                            }">Cancel</button>
                        </t>
                    `
                }
`;
