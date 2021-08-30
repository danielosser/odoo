/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            deleteMessageConfirmDialog
        [Field/model]
            MessageActionListComponent
        [Element/isPresent]
            @record
            .{MessageActionListComponent/messageActionList}
            .{MessageActionList/showDeleteConfirm}
        [web.Element/target]
            DeleteMessageConfirmDialogComponent
        [Element/props]
            [DeleteMessageConfirmDialogComponent/messageActionList]
                @record
                .{MessageActionListComponent/messageActionList}
`;
