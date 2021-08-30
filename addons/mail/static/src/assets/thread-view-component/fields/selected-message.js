/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            selectedMessage
        [Field/model]
            ThreadViewComponent
        [Field/type]
            m2o
        [Field/target]
            Message
`;
