/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isDisabled
        [Field/model]
            FollowButtonComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
