/** @odoo-module **/

import { Define } from '@mail/define';

import { datetime_to_str } from 'web.time';

export default Define`
    {Test}
        [Test/name]
            livechat - avatar: should have a smiley face avatar for an anonymous livechat item
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
                [Record/traits]
                    mail.channel
                [mail.channel/anonymous_name]
                    Visitor 11
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
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
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
                        /mail/static/src/img/smiley/avatar.jpg
                []
                    should have the smiley face as the avatar for anonymous users
`;
