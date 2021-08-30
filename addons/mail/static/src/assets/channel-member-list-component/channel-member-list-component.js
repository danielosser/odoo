/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ChannelMemberListComponent
        [Model/fields]
            channel
        [Model/template]
            root
                orderedOnlineMembers
                orderedOfflineMembers
                unknownMemberText
                loadMoreMembersContainer
                    loadMoreMembers
`;
