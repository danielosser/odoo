/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            channel - avatar: should have correct avatar
        [Test/model]
            DiscussSidebarCategoryItemComponent
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
                [mail.channel/avatarCacheKey]
                    100111
                [mail.channel/id]
                    20
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :channelItem
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
                .{Thread/discussSidebarCategoryItemComponents}
                .{Collection/first}
            {Test/assert}
                [0]
                    @record
                [1]
                    @channelItem
                    .{DiscussSidebarCategoryItemComponent/image}
                [2]
                    channel should have an avatar
            {Test/assert}
                [0]
                    @record
                [1]
                    @channelItem
                    .{DiscussSidebarCategoryItemComponent/image}
                    .{web.Element/src}
                    .{=}
                        /web/image/mail.channel/20/avatar_128?unique=100111
                [2]
                    should link to the correct picture source
`;
