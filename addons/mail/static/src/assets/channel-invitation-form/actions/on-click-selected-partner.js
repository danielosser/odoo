/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ChannelInvitationForm/onClickSelectedPartner
        [Action/params]
            partner
            record
        [Action/behavior]
            {Record/update}
                [0]
                    @record
                [1]
                    [ChannelInvitationForm/selectedPartners]
                        {Field/remove}
                            @partner
`;
