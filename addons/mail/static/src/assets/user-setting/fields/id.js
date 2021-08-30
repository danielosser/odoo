/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            UserSetting
        [Field/type]
            attr
        [Field/target]
            Integer
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;
