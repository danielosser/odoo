/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isInitialized
        [Field/model]
            Env
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
