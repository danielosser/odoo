/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            hover following button
        [Test/model]
            FollowButtonComponent
        [Test/assertions]
            8
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.followers
                    [mail.followers/id]
                        1
                    [mail.followers/is_active]
                        true
                    [mail.followers/is_editable]
                        true
                    [mail.followers/partner_id]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
                    [mail.followers/res_id]
                        100
                    [mail.followers/res_model]
                        res.partner
                []
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        100
                    [res.partner/message_follower_ids]
                        1
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :thread
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Thread
                    [Thread/id]
                        100
                    [Thread/model]
                        res.partner
            @testEnv
            .{Thread/follow}
                @thread
            @testEnv
            .{Record/insert}
                [Record/traits]
                    FollowButtonComponent
                [FollowButtonComponent/thread]
                    @thread
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have follow button component
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/first}
                    .{FollowButtonComponent/unfollow}
                [2]
                    should have 'Unfollow' button
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/first}
                    .{FollowButtonComponent/unfollow}
                    .{web.Element/textContent}
                    .{=}
                        Following
                [2]
                    unfollow' button should display 'Following' as text when not hovered
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/first}
                    .{web.Element/unfollowIcon}
                    .{isFalsy}
                [2]
                    'unfollow' button should not contain a cross icon when not hovered
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/first}
                    .{FollowButtonComponent/followingIcon}
                [2]
                    'unfollow' button should contain a check icon when not hovered

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/mouseenter}
                        @thread
                        .{Thread/followButtonComponents}
                        .{Collection/first}
                        .{FollowButtonComponent/unfollow}
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/first}
                    .{FollowButtonComponent/unfollow}
                    .{web.Element/textContent}
                    .{=}
                        Unfollow
                [2]
                    'unfollow' button should display 'Unfollow' as text when hovered
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/first}
                    .{FollowButtonComponent/unfollowIcon}
                [2]
                    'unfollow' button should contain a cross icon when hovered
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/first}
                    .{FollowButtonComponent/followingIcon}
                    .{isFalsy}
                [2]
                    'unfollow' button should not contain a check icon when hovered
`;
