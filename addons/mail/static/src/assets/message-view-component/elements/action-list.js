/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            actionList
        [Element/model]
            MessageViewComponent
        [Field/target]
            MessageActionListComponent
        [Element/props]
            [MessageActionListComponent/messageActionList]
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/messageActionList}
`;
