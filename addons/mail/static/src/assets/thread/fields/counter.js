/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            counter
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/default]
            0
`;
