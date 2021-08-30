/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Employee related to this partner. It is computed through
        the inverse relation and should be considered read-only.
    {Field}
        [Field/name]
            employee
        [Field/model]
            Partner
        [Field/feature]
            hr
        [Field/type]
            o2o
        [Field/target]
            Employee
        [Field/inverse]
            Employee/partner
`;
