/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ActionAddon}
        [ActionAddon/action]
            MessagingNotificationHandler/_handleNotificationChannelTypingStatus
        [ActionAddon/feature]
            im_livechat
        [ActionAddon/params]
            channel_id
            is_typing
            partner_id
            partner_name
        [ActionAddon/behavior]
            :channel
                {Record/findById}
                    [Thread/id]
                        @channel_id
                    [Thread/model]
                        mail.channel
            {if}
                @channel
                .{isFalsy}
            .{then}
                {break}
            :partnerId
            :partnerName
            .{if}
                {Env/publicPartners}
                .{Collection/some}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Partner/id}
                            .{=}
                                @data
                                .{Dict/get}
                                    partner_id
            .{then}
                {Dev/comment}
                    Some shenanigans that this is a typing notification
                    from public partner.
                    AKU TODO: overwrite param to pass to original
                :partnerId
                    @channel
                    .{Thread/correspondent}
                    .{Partner/id}
                :partnerName
                    @channel
                    .{Thread/correspondent}
                    .{Partner/name}
            .{else}
                {Dev/comment}
                    AKU TODO: overwrite param to pass to original
                :partnerId
                    @data
                    .{Dict/get}
                        partner_id
                :partnerName
                    @data
                    .{Dict/get}
                        partner_name
            @original
`;
