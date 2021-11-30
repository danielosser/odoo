/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            composerView
        [Field/model]
            ThreadView
        [Field/type]
            o2o
        [Field/target]
            ComposerView
        [Field/inverse]
            ComposerView/threadView
        [Field/isCausal]
            true
        [Field/compute]
            {if}
                @record
                .{ThreadView/thread}
                .{isFalsy}
                .{|}
                    @record
                    .{/thread}
                    .{Thread/model}
                    .{=}
                        mail.box
            .{then}
                {Record/empty}
            .{elif}
                @record
                .{ThreadView/threadViewer}
                .{&}
                    @record
                    .{ThreadView/threadViewer}
                    .{ThreadViewer/chatter}
            .{then}
                {Record/empty}
            .{else}
                {Record/insert}
                    [Record/traits]
                        ComposerView
`;
