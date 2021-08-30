/** @odoo-module **/

import { Define } from '@mail/define';

import OwlDialog from 'web.OwlDialog';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            DeleteMessageConfirmDialogComponent
        [web.Element/target]
            ${OwlDialog}
        [Element/props]
            [title]
                {Locale/text}
                    Confirmation
        [Element/t-on-dialog-closed]
            {MessageActionList/onDeleteConfirmDialogClosed}
                [0]
                    @record
                    .{DeleteMessageConfirmDialogComponent/messageActionList}
                [1]
                    @ev
        [Element/slot]
            {qweb}
                ${
                    `
                        <p>${
                            Define`
                                {Locale/text}
                                    Are you sure you want to delete this message?
                            `
                        }</p>
                        <blockquote class="o-DeleteMessageConfirmDialogComponent-blockquote" style="font-style: normal">
                            ${
                                Define`
                                    {Element}
                                        [Element/name]
                                            message
                                        [Field/model]
                                            DeleteMessageConfirmDialogComponent
                                        [Field/target]
                                            MessageViewComponent
                                        [Element/props]
                                            [MessageViewComponent/messageView]
                                                @record
                                                .{DeleteMessageConfirmDialogComponent/messageActionList}
                                                .{MessageActionList/messageViewForDelete}
                                            [MessageViewComponent/showActions]
                                                false
                                `
                            }
                        </blockquote>
                        <small t-if="${
                            Define`
                                @record
                                .{DeleteMessageConfirmDialogComponent/messageActionList}
                                .{MessageActionList/message}
                                .{Message/originThread}
                                .{isFalsy}
                                .{|}
                                    @record
                                    .{DeleteMessageConfirmDialogComponent/messageActionList}
                                    .{MessageActionList/message}
                                    .{Message/originThread}
                                    .{Thread/model}
                                    .{!=}
                                        mail.channel
                            `
                        }">${
                            Define`
                                {Locale/text}
                                    Pay attention: The followers of this document who were notified by email will still be able to read the content of this message and reply to it.
                            `
                        }</small>
                        <t t-set-slot="buttons">
                            <button class="btn btn-primary" t-on-click="
                            ${
                                Define`
                                    {MessageActionList/onClickConfirmDelete}
                                        @record
                                        .{DeleteMessageConfirmDialogComponent/messageActionList}
                                `
                            }">
                            ${
                                Define`
                                    {Locale/text}
                                        Delete
                                `
                            }</button>
                            <button class="btn btn-secondary" t-on-click="${
                                Define`
                                    @record
                                    .{DeleteMessageConfirmDialogComponent/root}
                                    .{Dict/get}
                                        comp
                                    .{Dict/get}
                                        _close
                                    .{Function/call}
                                `
                            }">${
                                Define`
                                    {Locale/text}
                                        Cancel
                                `
                            }</button>
                        </t>
                    `
                }
`;
