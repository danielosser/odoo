/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hasVisibleChatWindows
        [Field/model]
            ChatWindowManager
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/compute]
            @record
            .{ChatWindowManager/allOrderedVisible}
            .{Collection/length}
            .{>}
                0
`;
