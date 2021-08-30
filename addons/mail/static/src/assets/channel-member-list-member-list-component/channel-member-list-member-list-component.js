/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ChannelMemberListMemberListComponent
        [Model/fields]
            channel
            members
            title
        [Model/template]
            titlePart
            memberForeach
`;
