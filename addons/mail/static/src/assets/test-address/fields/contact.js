/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            contact
        [Field/model]
            TestAddress
        [Field/type]
            o2o
        [Field/target]
            TestContact
        [Field/inverse]
            address
`;
