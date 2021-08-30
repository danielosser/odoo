/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            snailmailErrorDialog
        [Element/feature]
            snailmail
        [Element/model]
            MessageViewComponent
        [Field/target]
            SnailmailErrorDialogComponent
        [Element/isPresent]
            @record
            .{MessageViewComponent/hasSnailmailDialog}
        [Element/props]
            [SnailmailErrorDialogComponent/message]
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
        [Element/t-on-dialog-closed]
            {Record/update}
                [0]
                    @record
                [1]
                    [MessageViewComponent/hasSnailmailDialog]
                        false
`;
