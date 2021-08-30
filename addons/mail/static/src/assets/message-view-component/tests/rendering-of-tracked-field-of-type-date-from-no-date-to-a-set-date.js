/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            rendering of tracked field of type date: from no date to a set date
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
                                Deadline
                            [field_type]
                                date
                            [id]
                                6
                            [new_value]
                                2018-12-14
                            [old_value]
                                false
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
                        Deadline:12/14/2018
                [2]
                    should display the correct content of tracked field of type date: from no date to a set date (Deadline: -> 12/14/2018)
`;
