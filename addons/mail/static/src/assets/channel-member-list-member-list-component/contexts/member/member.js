/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Context}
        [Context/name]
            member
        [Context/model]
            ChannelMemberListMemberListComponent
        [Model/fields]
            member
        [Model/template]
            memberForeach
                member
                    avatarContainer
                        avatar
                        partnerImStatusIcon
                    name
`;
