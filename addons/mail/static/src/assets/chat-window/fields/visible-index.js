/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        This field handle the "order" (index) of the visible chatWindow
        inside the UI.

        Using LTR, the right-most chat window has index 0, and the number is
        incrementing from right to left.
        Using RTL, the left-most chat window has index 0, and the number is
        incrementing from left to right.
    {Field}
        [Field/name]
            visibleIndex
        [Field/model]
            ChatWindow
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/compute]
            {if}
                @record
                .{ChatWindow/manager}
                .{isFalsy}
            .{then}
                {Record/empty}
                {break}
            {if}
                record
                .{ChatWindow/manager}
                .{ChatWindowManager/visual}
                .{Visual/visible}
                .{Collection/includes}
                    @record
            .{then}
                @record
                .{ChatWindow/manager}
                .{ChatWindowManager/visual}
                .{Visual/visible}
                .{Collection/indexOf}
                    @record
            .{else}
                {Record/empty}
`;
