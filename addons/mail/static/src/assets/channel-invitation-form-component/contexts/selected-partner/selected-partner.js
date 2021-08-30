/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Context}
        [Context/name]
            selectedPartner
        [Context/model]
            ChannelInvitationFormComponent
        [Model/fields]
            selectedPartner
        [Model/template]
            selectedPartnerForeach
                selectedPartner
                    selectedPartnerLabel
                    selectedPartnerLabelIconSeparator
                    selectedPartnerIcon
`;
