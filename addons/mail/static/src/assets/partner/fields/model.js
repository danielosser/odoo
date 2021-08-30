/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            model
        [Field/model]
            Partner
        [Field/type]
            attr
        [Field/target]
            String
        [Field/default]
            res.partner
`;
