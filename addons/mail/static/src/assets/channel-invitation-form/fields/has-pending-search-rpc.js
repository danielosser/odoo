/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States whether there is a pending search RPC.
    {Field}
        [Field/name]
            hasPendingSearchRpc
        [Field/model]
            ChannelInvitationForm
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;