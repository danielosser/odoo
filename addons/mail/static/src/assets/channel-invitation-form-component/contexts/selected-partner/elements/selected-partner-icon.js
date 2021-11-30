/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            selectedPartnerIcon
        [Element/model]
            ChannelInvitationFormComponent:selectedPartner
        [web.Element/tag]
            i
        [web.Element/class]
            fa
            fa-times
`;
