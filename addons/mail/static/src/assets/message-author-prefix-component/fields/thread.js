/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            thread
        [Field/model]
            MessageAuthorPrefixComponent
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/isRequired]
            true
`;
