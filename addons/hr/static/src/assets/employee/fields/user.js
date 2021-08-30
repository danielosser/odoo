/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        User related to this employee.
    {Field}
        [Field/name]
            user
        [Field/model]
            Employee
        [Field/type]
            o2o
        [Field/target]
            User
        [Field/inverse]
            User/employee
`;
