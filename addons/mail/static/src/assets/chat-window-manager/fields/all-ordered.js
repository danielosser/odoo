/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        FIXME: dependent on implementation that uses arbitrary order in relations!!
    {Field}
        [Field/name]
            allOrdered
        [Field/model]
            ChatWindowManager
        [Field/type]
            o2m
        [Field/target]
            ChatWindow
        [Field/compute]
            @record
            .{ChatWindowManager/chatWindows}
`;
