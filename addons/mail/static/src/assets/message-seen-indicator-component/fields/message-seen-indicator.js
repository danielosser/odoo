/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            messageSeenIndicator
        [Field/model]
            MessageSeenIndicatorComponent
        [Field/type]
            m2o
        [Field/target]
            MessageSeenIndicator
        [Field/compute]
            {Record/find}
                [Record/traits]
                    MessageSeenIndicator
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{MessageSeenIndicator/message}
                        .{=}
                            @record
                            .{MessageSeenIndicator/message}
                        .{&}
                            @item
                            .{MessageSeenIndicator/thread}
                            .{=}
                                @record
                                .{MessageSeenIndicator/thread}
`;
