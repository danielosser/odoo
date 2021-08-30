/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the 'SuggestedRecipientInfo' concerning 'this'.
    {Field}
        [Field/name]
            suggestedRecipientInfoList
        [Field/model]
            Thread
        [Field/type]
            o2m
        [Field/target]
            SuggestedRecipientInfo
        [Field/inverse]
            SuggestedRecipientInfo/thread
        [Field/isCausal]
            true
`;
