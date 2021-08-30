/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            rendering of tracked field of type text: from some text to empty
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
                                Name
                            [field_type]
                                text
                            [id]
                                6
                            [new_value]
                                {String/empty}
                            [old_value]
                                Marc
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
                        Name:Marc
                [2]
                    should display the correct content of tracked field of type text: from some text to empty (Name: Marc ->)
`;
