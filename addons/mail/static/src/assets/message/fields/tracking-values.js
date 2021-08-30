/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            trackingValues
        [Field/model]
            Message
        [Field/type]
            attr
        [Field/target]
            Array
`;
