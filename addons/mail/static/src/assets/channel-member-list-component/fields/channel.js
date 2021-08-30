/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            channel
        [Field/model]
            ChannelMemberListComponent
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/isRequired]
            true
`;
