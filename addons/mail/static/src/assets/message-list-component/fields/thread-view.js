/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            threadView
        [Field/model]
            MessageListComponent
        [Field/type]
            m2o
        [Field/target]
            ThreadView
        [Field/isRequired]
            true
`;
