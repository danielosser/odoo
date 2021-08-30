/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States whether the reaction popover is currently opened.
    {Field}
        [Field/name]
            isReactionPopoverOpened
        [Field/model]
            MessageActionList
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/compute]
            @record
            .{MessageActionList/reactionPopoverRef}
            .{&}
                @record
                .{MessageActionList/reactionPopoverRef}
                .{Popover/isDisplayed}
`;
