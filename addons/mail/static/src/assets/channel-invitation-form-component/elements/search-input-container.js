/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            searchInputContainer
        [Element/model]
            ChannelInvitationFormComponent
        [Element/isPresent]
            {Env/isCurrentUserGuest}
            .{isFalsy}
        [web.Element/class]
            mx-3
            my-2
`;
