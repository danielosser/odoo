/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the 'ThreadView' currently displayed and managed by 'this'.
    {Field}
        [Field/name]
            threadView
        [Field/model]
            ThreadViewer
        [Field/type]
            o2o
        [Field/target]
            ThreadView
        [Field/inverse]
            ThreadView/threadViewer
        [Field/isCausal]
            true
        [Field/compute]
            {if}
                @record
                .{ThreadViewer/hasThreadView}
                .{isFalsy}
            .{then}
                {Record/empty}
            .{else}
                {Record/insert}
                    [Record/traits]
                        ThreadView
`;
