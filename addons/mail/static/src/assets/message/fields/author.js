/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            author
        [Field/model]
            Message
        [Field/type]
            m2o
        [Field/target]
            Partner
`;
