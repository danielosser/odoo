/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            commands
        [Field/model]
            Env
        [Field/type]
            o2m
        [Field/target]
            ChannelCommand
`;
