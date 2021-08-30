/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            creator
        [Field/model]
            Thread
        [Field/type]
            m2o
        [Field/target]
            User
`;
