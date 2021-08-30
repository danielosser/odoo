/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messageActionList
        [Field/model]
            MessageActionListComponent
        [Field/type]
            m2o
        [Field/target]
            MessageActionList
        [Field/isRequired]
            true
`;
