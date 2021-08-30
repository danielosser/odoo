/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messageInReplyToView
        [Field/model]
            MessageInReplyToViewComponent
        [Field/type]
            m2o
        [Field/target]
            MessageInReplyToView
        [Field/isRequired]
            true
`;
