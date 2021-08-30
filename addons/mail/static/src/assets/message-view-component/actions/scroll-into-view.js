/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Make this message viewable in its enclosing scroll environment (usually
        message list).
    {Action}
        [Action/name]
            MessageViewComponent/scrollIntoView
        [Action/params]
            behavior
                [type]
                    String
                [default]
                    auto
            block
                [type]
                    String
                [default]
                    end
            record
                [type]
                    MessageViewComponent
        [Action/behavior]
            {UI/scrollIntoView}
                [0]
                    @record
                    .{MessageViewComponent/root}
                [1]
                    [behavior]
                        @behavior
                    [block]
                        @block
                    [inline]
                        nearest
            {if}
                @behavior
                .{=}
                    smooth
            .{then}
                {Record/insert}
                    [Record/traits]
                        Promise
                    {func}
                        [in]
                            resolve
                        [out]
                            {Record/insert}
                                [Record/traits]
                                    Timer
                                [Timer/timeout]
                                    {func}
                                        @resolve
                                [Timer/duration]
                                    500
                            .{Timer/start}
`;
