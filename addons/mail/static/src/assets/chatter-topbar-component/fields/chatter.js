/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatter
        [Field/model]
            ChatterTopbarComponent
        [Field/type]
            m2o
        [Field/target]
            Chatter
        [Field/isRequired]
            true
`;
