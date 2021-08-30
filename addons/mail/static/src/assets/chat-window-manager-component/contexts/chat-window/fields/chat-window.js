/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatWindow
        [Field/model]
            ChatWindowManagerComponent:chatWindow
        [Field/type]
            m2o
        [Field/target]
            ChatWindow
        [Field/isRequired]
            true
`;
