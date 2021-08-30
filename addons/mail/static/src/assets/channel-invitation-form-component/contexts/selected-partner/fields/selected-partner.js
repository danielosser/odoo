/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            selectedPartner
        [Field/model]
            ChannelInvitationFormComponent:selectedPartner
        [Field/type]
            m2o
        [Field/target]
            Partner
        [Field/isRequired]
            true
`;
