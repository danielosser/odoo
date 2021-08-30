/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messageReactionGroup
        [Field/model]
            MessageReactionGroupComponent
        [Field/type]
            m2o
        [Field/target]
            MessageReactionGroup
`;
