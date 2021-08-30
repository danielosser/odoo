/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            member
        [Field/model]
            ChannelMemberListMemberListComponent
        [Field/type]
            m2o
        [Field/target]
            Partner
        [Field/isRequired]
            true
`;
