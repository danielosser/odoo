/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            allOrderedHidden
        [Field/model]
            ChatWindowManager
        [Field/type]
            o2m
        [Field/target]
            ChatWindow
        [Field/compute]
            @record
            .{ChatWindowManager/visual}
            .{Visual/hidden}
            .{Hidden/chatWindows}
`;
