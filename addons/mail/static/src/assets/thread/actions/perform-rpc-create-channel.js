/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Performs the 'channel_create' RPC on 'mail.channel'.
    {Action}
        [Action/name]
            Thread/performRpcCreateChannel
        [Action/params]
            name
                [type]
                    String
            privacy
                [type]
                    String
        [Action/returns]
            Thread
                [description]
                    the created channel
        [Action/behavior]
            :data
                @env
                .{Env/owlEnv}
                .{Dict/get}
                    services
                .{Dict/get}
                    rpc
                .{Function/call}
                    [model]
                        mail.channel
                    [method]
                        channel_create
                    [args]
                        {Record/insert}
                            [Record/traits]
                                Collection
                            [0]
                                @name
                            [1]
                                @privacy
                    [kwargs]
                        [context]
                            {Record/insert}
                                [Record/traits]
                                    Object
                                @env
                                .{Env/owlEnv}
                                .{Dict/get}
                                    session
                                .{Dict/get}
                                    user_content
                                {Dev/comment}
                                    optimize the return value by avoiding
                                    useless queries in non-mobile devices
                                [isMobile]
                                    {Device/isMobile}
            {Record/insert}
                [Record/traits]
                    Thread
                {Thread/convertData}
                    @data
`;
