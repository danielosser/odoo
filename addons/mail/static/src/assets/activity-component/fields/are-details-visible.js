/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            areDetailsVisible
        [Field/model]
            ActivityComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
