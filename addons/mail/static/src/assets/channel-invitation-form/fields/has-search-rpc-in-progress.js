/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States whether there is search RPC in progress.
    {Field}
        [Field/name]
            hasSearchRpcInProgress
        [Field/model]
            ChannelInvitationForm
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;