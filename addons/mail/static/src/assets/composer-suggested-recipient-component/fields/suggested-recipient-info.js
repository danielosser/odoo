/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            suggestedRecipientInfo
        [Field/model]
            ComposerSuggestedRecipientComponent
        [Field/type]
            m2o
        [Field/target]
            SuggestedRecipientInfo
        [Field/isRequired]
            true
`;
