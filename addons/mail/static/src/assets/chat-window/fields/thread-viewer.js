/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the 'ThreadViewer' managing the display of 'this.thread'.
    {Field}
        [Field/name]
            threadViewer
        [Field/model]
            ChatWindow
        [Field/type]
            o2o
        [Field/target]
            ThreadViewer
        [Field/isCausal]
            true
        [Field/required]
            true
        [Field/inverse]
            ThreadViewer/chatWindow
        [Field/compute]
            {Record/insert}
                [Record/traits]
                    ThreadViewer
                [ThreadViewer/compact]
                    true
                [ThreadViewer/hasThreadView]
                    @record
                    .{ChatWindow/hasThreadView}
                [ThreadViewer/thread]
                    {if}
                        @record
                        .{ChatWindow/thread}
                    .{then}
                        @record
                        .{ChatWindow/thread}
                    .{else}
                        {Record/empty}
`;
