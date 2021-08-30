/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isServerPinned
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
