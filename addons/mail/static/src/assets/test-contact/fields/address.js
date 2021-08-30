/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            address
        [Field/model]
            TestContact
        [Field/type]
            o2o
        [Field/target]
            TestAddress
        [Field/inverse]
            TestAddress/contact
`;
