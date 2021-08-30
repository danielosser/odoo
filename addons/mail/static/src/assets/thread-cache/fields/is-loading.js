/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isLoading
        [Field/model]
            ThreadCache
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
