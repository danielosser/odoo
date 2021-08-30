/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            threadView
        [Field/model]
            ThreadViewComponent
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/isRequired]
            true
`;
