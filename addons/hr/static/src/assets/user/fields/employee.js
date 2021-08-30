/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Employee related to this user.
    {Field}
        [Field/name]
            employee
        [Field/model]
            User
        [Field/feature]
            hr
        [Field/type]
            o2o
        [Field/target]
            Employee
        [Field/inverse]
            Employee/user
`;
