/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messageView
        [Field/model]
            MessageViewComponent
        [Field/type]
            m2o
        [Field/target]
            MessageView
        [Field/isRequired]
            true
        [Field/inverse]
            MessageView/component
`;
