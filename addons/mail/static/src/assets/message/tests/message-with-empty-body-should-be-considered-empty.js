/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            message with body "" should be considered empty
        [Test/model]
            Message
        [Test/assertions]
            1
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :message
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Message
                    [Message/body]
                        {String/empty}
                    [Message/id]
                        11
            {Test/assert}
                [0]
                    @record
                [1]
                    @message
                    .{Message/isEmpty}
`;
