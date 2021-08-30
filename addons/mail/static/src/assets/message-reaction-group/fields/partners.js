/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the partners that have used this reaction on this message.
    {Field}
        [Field/name]
            partners
        [Field/model]
            MessageReactionGroup
        [Field/type]
            m2m
        [Field/target]
            Partner
`;
