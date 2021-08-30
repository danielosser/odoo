/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            members
        [Field/model]
            ChannelMemberListMemberListComponent
        [Field/type]
            m2m
        [Field/target]
            Partner
`;
