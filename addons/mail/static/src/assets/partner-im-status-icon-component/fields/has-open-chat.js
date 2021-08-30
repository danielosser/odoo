/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether a click on 'this' should open a chat with
        'this.partner'.
    {Field}
        [Field/name]
            hasOpenChat
        [Field/model]
            PartnerImStatusIconComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
