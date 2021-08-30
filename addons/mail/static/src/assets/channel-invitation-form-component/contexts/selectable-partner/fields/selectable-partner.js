/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            selectablePartner
        [Field/model]
            ChannelInvitationFormComponent:selectablePartner
        [Field/type]
            m2o
        [Field/target]
            Partner
        [Field/isRequired]
            true
`;
