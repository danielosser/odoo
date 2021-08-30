/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the optional 'Partner' associated to 'this'.
    {Field}
        [Field/name]
            partner
        [Field/model]
            SuggestedRecipientInfo
        [Field/type]
            m2o
        [Field/target]
            Partner
`;
