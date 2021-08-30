/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isLoaded
        [Field/model]
            ThreadCache
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
