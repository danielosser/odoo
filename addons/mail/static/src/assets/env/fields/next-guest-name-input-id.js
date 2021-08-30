/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            nextGuestNameInputId
        [Field/model]
            Env
        [Field/type]
            attr
        [Field/target]
            Integer
        [Field/default]
            0
`;
