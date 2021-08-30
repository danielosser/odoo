/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            selectedPartnersTitle
        [Element/model]
            ChannelInvitationFormComponent
        [web.Element/tag]
            h4
        [web.Element/textContent]
            {Locale/text}
                Selected users:
`;
