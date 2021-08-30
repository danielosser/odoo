/** @odoo-module **/

import { Define } from '@mail/define';

import { datetime_to_str } from 'web.time';

export default Define`
    {Test}
        [Test/name]
            livechat - avatar: should have a partner profile picture for a livechat item linked with a partner
        [Test/model]
            DiscussSidebarCategoryItemComponent
        [Test/feature]
            im_livechat
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        livechat
                    [mail.channel/id]
                        11
                    [mail.channel/livechat_operator_id]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
                    [mail.channel/members]
                        [0]
                            @record
                            .{Test/data}
                            .{Data/currentPartnerId}
                        [1]
                            10
                []
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        10
                    [res.partner/name]
                        Jean
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :livechatItem
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        11
                    [Thread/model]
                        mail.channel
                .{Thread/discussSidebarCategoryItemComponents}
                .{Collection/first}
            {Test/assert}
                []
                    @livechatItem
                    .{DiscussSidebarCategoryItemComponent/image}
                []
                    should have an avatar
            {Test/assert}
                []
                    @livechatItem
                    .{DiscussSidebarCategoryItemComponent/image}
                    .{web.Element/src}
                    .{=}
                        /web/image/res.partner/10/avatar_128
                []
                    should have the partner profile picture as the avatar for partners
`;
