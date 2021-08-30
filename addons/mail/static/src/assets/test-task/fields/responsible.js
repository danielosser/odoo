/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            responsible
        [Field/model]
            TestTask
        [Field/type]
            m2o
        [Field/target]
            TestContact
        [Field/inverse]
            TestContact/tasks
`;
