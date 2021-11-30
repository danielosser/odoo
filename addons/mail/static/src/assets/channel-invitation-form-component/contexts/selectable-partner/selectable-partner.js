/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Context}
        [Context/name]
            selectablePartner
        [Context/model]
            ChannelInvitationFormComponent
        [Model/fields]
            selectablePartner
        [Model/template]
            selectablePartnerForeach
                selectablePartner
                    selectablePartnerAvatarContainer
                        selectablePartnerAvatar
                        selectablePartnerImStatusIcon
                    selectablePartnerAvatarNameSeparator
                    selectablePartnerName
                    selectablePartnerNameSelectionSeparator
                    selectablePartnerCheckbox
`;
