/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            tasks
        [Field/model]
            TestContact
        [Field/type]
            o2m
        [Field/target]
            TestTask
        [Field/inverse]
            TestTask/responsible
`;
