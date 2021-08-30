/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the 'Thread' concerned by 'this.'
    {Field}
        [Field/name]
            thread
        [Field/model]
            SuggestedRecipientInfo
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/suggestedRecipientInfoList
        [Field/isRequired]
            true
`;
