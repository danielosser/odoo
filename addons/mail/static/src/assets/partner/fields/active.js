/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            active
        [Field/model]
            Partner
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            true
`;
