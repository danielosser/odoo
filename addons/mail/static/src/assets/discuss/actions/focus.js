/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Discuss/focus
        [Action/params]
            record
                [type]
                    Discuss
        [Action/behavior]
            {if}
                @record
                .{Discuss/threadView}
                .{&}
                    @record
                    .{Discuss/threadView}
                    .{ThreadView/composerView}
            .{then}
                {Record/update}
                    [0]
                        @record
                        .{Discuss/threadView}
                        .{ThreadView/composerView}
                    [1]
                        [ComposerView/doFocus]
                            true
`;
