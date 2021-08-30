/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            CannedResponse
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
`;
