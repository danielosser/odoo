/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Chatter/focus
        [Action/params]
            record
                [type]
                    Chatter
        [Action/behavior]
            {if}
                @record
                .{Chatter/composerView}
            .{then}
                {Record/update}
                    [0]
                        @record
                        .{Chatter/composerView}
                    [1]
                        [ComposerView/doFocus]
                            true
`;
