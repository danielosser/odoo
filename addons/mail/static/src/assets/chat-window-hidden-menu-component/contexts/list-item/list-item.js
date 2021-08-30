/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Context}
        [Context/name]
            listItem
        [Context/model]
            ChatWindowHiddenMenuComponent
        [Model/fields]
            chatWindow
        [Model/template]
            listItemForeach
                listItem
                    chatWindowHeader
`;
