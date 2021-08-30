/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Groups of reactions per content allowing to know the number of
        reactions for each.
    {Field}
        [Field/name]
            messageReactionGroups
        [Field/model]
            Message
        [Field/type]
            o2m
        [Field/target]
            MessageReactionGroup
        [Field/inverse]
            MessageReactionGroup/message
        [Field/isCausal]
            true
`;
