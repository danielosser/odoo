/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            actionEdit
        [Field/model]
            MessageActionListComponent
        [Model/traits]
            MessageActionListComponent/action
        [Element/isPresent]
            @record
            .{MessageActionListComponent/messageActionList}
            .{MessageActionList/message}
            .{Message/canBeDeleted}
        [web.Element/class]
            fa-pencil
        [web.Element/title]
            {Locale/text}
                Edit
        [Element/onClick]
            {MessageActionList/onClickEdit}
                @record
                .{MessageActionListComponent/messageActionLists}
`;
