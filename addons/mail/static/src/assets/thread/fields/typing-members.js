/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Members that are currently typing something in the composer of this
        thread, including current partner.
    {Field}
        [Field/name]
            typingMembers
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Partner
`;
