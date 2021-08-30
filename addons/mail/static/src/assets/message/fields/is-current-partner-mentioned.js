/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determine whether the current partner is mentioned.
    {Field}
        [Field/name]
            isCurrentPartnerMentioned
        [Field/model]
            Message
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
