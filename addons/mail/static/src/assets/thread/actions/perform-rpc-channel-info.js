/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Performs the 'channel_info' RPC on 'mail.channel'.
    {Action}
        [Action/name]
            Thread/performRpcChannelInfo
        [Action/params]
            ids
                [type]
                    Collection<Integer>
                [description]
                    list of id of channels
        [Action/returns]
            Collection<Thread>
        [Action/behavior]
            :channelInfos
                @env
                .{Env/owlEnv}
                .{Dict/get}
                    services
                .{Dict/get}
                    rpc
                .{Function/call}
                    [0]
                        [model]
                            mail.channel
                        [method]
                            channel_info
                        [args]
                            {Record/insert}
                                [Record/traits]
                                    Collection
                                @ids
                    [1]
                        [shadow]
                            true
            :channels
                {Record/insert}
                    [Record/traits]
                        Thread
                    @channelInfos
                    .{Collection/map}
                        {func}
                            [in]
                                item
                            [out]
                                {Thread/convertData}
                                    @item
            @channels
`;
