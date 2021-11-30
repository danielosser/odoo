/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/action]
            MessagingNotificationHandler/_handleNotificationPartner
        [ActionAddon/feature]
            website_livechat
        [ActionAddon/params]
            message
        [ActionAddon/behavior]
            {if}
                @message
                .{Dict/get}
                    type
                .{=}
                    website_livechat.send_chat_request
            .{then}
                :convertedData
                    {Thread/convertData}
                        [Thread/model]
                            mail.channel
                        @message
                        .{Dict/get}
                            payload
                {Record/insert}
                    [Record/traits]
                        Thread
                    @convertedData
                :channel
                    {Record/findById}
                        [Thread/id]
                            @message
                            .{Dict/get}
                                payload
                            .{Dict/get}
                                id
                        [Thread/model]
                            mail.channel
                {ChatWindowManager/openThread}
                    @channel
                    [makeActive]
                        true
            .{else}
                @original
`;
