/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the 'ThreadViewer' managing the display of 'this.thread'.
    {Field}
        [Field/name]
            threadViewer
        [Field/model]
            Discuss
        [Field/type]
            o2o
        [Field/target]
            ThreadViewer
        [Field/isCausal]
            true
        [Field/readonly]
            true
        [Field/required]
            true
        [Field/inverse]
            ThreadViewer/discuss
        [Field/compute]
            {Record/insert}
                [Record/traits]
                    ThreadViewer
                [ThreadViewer/hasMemberList]
                    true
                [ThreadViewer/hasThreadView]
                    @record
                    .{Discuss/hasThreadView}
                [ThreadViewer/hasTopbar]
                    true
                [ThreadViewer/thread]
                    {if}
                        @record
                        .{Discuss/thread}
                    .{then}
                        @record
                        .{Discuss/thread}
                    .{else}
                        {Record/empty}
`;
