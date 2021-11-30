/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            rendering with multiple partner followers
        [Test/model]
            ChatterTopbarComponent
        [Test/assertions]
            6
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    {Dev/comment}
                        simulate real return from RPC
                    [Record/traits]
                        mail.followers
                    [mail.followers/id]
                        1
                    [mail.followers/name]
                        Jean Michang
                    [mail.followers/partner_id]
                        12
                    [mail.followers/res_id]
                        100
                    [mail.followers/res_model]
                        res.partner
                [1]
                    {Dev/comment}
                        simulate real return from RPC
                    [Record/traits]
                        mail.followers
                    [mail.followers/id]
                        2
                    [mail.followers/name]
                        Eden Hazard
                    [mail.followers/partner_id]
                        11
                    [mail.followers/res_id]
                        100
                    [mail.followers/res_model]
                        res.partner
                [2]
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        100
                    [res.partner/message_follower_ids]
                        1
                        2
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :chatter
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Chatter
                    [Chatter/followerIds]
                        1
                        2
                    [Chatter/id]
                        11
                    [Chatter/threadId]
                        100
                    [Chatter/threadModel]
                        res.partner
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ChatterTopbarComponent
                [ChatterTopbarComponent/chatter]
                    @chater
            {Test/assert}
                []
                    @chatter
                    .{Chatter/thread}
                    .{Thread/followerListMenuComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have followers menu component
            {Test/assert}
                []
                    @chatter
                    .{Chatter/thread}
                    .{Thread/followerListMenuComponents}
                    .{Collection/first}
                    .{FollowerListMenuComponent/buttonFollowers}
                []
                    should have followers button

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @chatter
                        .{Chatter/thread}
                        .{Thread/followerListMenuComponents}
                        .{Collection/first}
                        .{FollowerListMenuComponent/buttonFollowers}
            {Test/assert}
                []
                    @chatter
                    .{Chatter/thread}
                    .{Thread/followerListMenuComponents}
                    .{Collection/first}
                    .{FollowerListMenuComponent/dropdown}
                []
                    followers dropdown should be opened
            {Test/assert}
                []
                    @chatter
                    .{Chatter/thread}
                    .{Thread/followers}
                    .{Collection/length}
                    .{=}
                        2
                []
                    exactly two followers should be listed
            {Test/assert}
                []
                    @chatter
                    .{Chatter/thread}
                    .{Thread/followers}
                    .{Collection/first}
                    .{Follower/name}
                    .{=}
                        Jean Michang
                []
                    first follower is 'Jean Michang'
            {Test/assert}
                []
                    @chatter
                    .{Chatter/thread}
                    .{Thread/followers}
                    .{Collection/second}
                    .{Follower/name}
                    .{=}
                        Eden Hazard
                []
                    second follower is 'Eden Hazard'
`;
