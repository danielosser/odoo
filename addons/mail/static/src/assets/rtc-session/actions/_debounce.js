/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            RtcSession/_debounce
        [Action/params]
            f
                [type]
                    Function
            delay
                [type]
                    Integer
            record
                [type]
                    record
        [Action/behavior]
            {if}
                @record
                .{RtcSession/_timeoutId}
            .{then}
                {Browser/clearTimeout}
                    @record
                    .{RtcSession/_timeoutId}
            {Record/update}
                [0]
                    @record
                [1]
                    [RtcSession/_timeoutId]
                        {Browser/setTimeout}
                            [0]
                                {func}
                                    {if}
                                        {Record/exists}
                                            @record
                                        .{isFalsy}
                                    .{then}
                                        {break}
                                    @f
                                    .{Function/call}
                            [1]
                                @delay
`;
