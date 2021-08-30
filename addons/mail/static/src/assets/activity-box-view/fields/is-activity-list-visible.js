/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isActivityListVisible
        [Field/model]
            ActivityBoxView
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Fild/default]
            true
`;
