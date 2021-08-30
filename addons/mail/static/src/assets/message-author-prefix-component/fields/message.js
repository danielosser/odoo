/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            message
        [Field/model]
            MessageAuthorPrefixComponent
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/isRequired]
            true
`;
