/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the reference to the reaction popover component (if any).
    {Field}
        [Field/name]
            reactionPopoverRef
        [Field/model]
            MessageActionList
        [Field/type]
            attr
        [Field/target]
            Element
        [Field/related]
            MessageActionList/messageActionListComponents
            Collection/first
            MessageActionListComponent/actionReaction
`;
