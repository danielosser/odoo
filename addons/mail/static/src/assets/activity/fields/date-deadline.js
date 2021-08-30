/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            dateDeadline
        [Field/model]
            Activity
        [Field/type]
            attr
        [Field/target]
            Date
`;
