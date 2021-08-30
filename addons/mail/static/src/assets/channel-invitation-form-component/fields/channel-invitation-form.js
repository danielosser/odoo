/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            channelInvitationForm
        [Field/model]
            ChannelInvitationFormComponent
        [Field/type]
            m2o
        [Field/target]
            ChannelInvitationForm
        [Field/inverse]
            ChannelInvitationForm/channelInvitationFormComponents
        [Field/isRequired]
            true
`;