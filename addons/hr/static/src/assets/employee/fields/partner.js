/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Partner related to this employee.
    {Field}
        [Field/name]
            partner
        [Field/model]
            Employee
        [Field/type]
            o2o
        [Field/target]
            Partner
        [Field/inverse]
            Partner/employee
        [Field/related]
            Employee/user
            user/partner
`;
