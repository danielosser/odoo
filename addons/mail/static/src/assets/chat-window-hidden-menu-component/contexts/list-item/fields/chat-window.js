/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatWindow
        [Context/model]
            ChatWindowHiddenMenuComponent:listItem
        [Field/type]
            m2o
        [Field/target]
            ChatWindow
        [Field/isRequired]
            true
`;
