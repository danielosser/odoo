/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The keyword to use a specific command.
    {Field}
        [Field/name]
            name
        [Field/model]
            ChannelCommand
        [Field/type]
            attr
        [Field/target]
            String
        [Field/isRequired]
            true
        [Field/isReadonly]
            true
`;
