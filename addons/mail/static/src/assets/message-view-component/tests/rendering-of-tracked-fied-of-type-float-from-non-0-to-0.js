/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            rendering of tracked field of type float: from non-0 to 0
        [Test/model]
            MessageViewComponent
        [Test/assertions]
            1
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            :message
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Message
                    [Message/id]
                        11
                    [Message/trackingValues]
                        [0]
                            [changed_field]
                                Total
                            [field_type]
                                float
                            [id]
                                6
                            [new_value]
                                0
                            [old_value]
                                1
            @testEnv
            .{Record/insert}
                [Record/traits]
                    MessageViewComponent
                [MessageViewComponent/message]
                    @message
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/trackingValue}
                    .{Collection/first}
                    .{web.Element/textContent}
                    .{=}
                        Total:1.000.00
                [2]
                    should display the correct content of tracked field of type float: from non-0 to 0 (Total: 1.00 -> 0.00)
`;
