/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            type
        [Field/model]
            NotificationGroup
        [Field/type]
            attr
        [Field/target]
            String
        [Field/isReadonly]
            true
`;
