/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            base rendering editable
        [Test/model]
            FollowerComponent
        [Test/assertions]
            6
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
            :thread
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Thread
                    [Thread/id]
                        100
                    [Thread/model]
                        res.partner
            :follower
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Follower
                    [Follower/followedThread]
                        @thread
                    [Follower/id]
                        2
                    [Follower/isActive]
                        true
                    [Follower/isEditable]
                        true
                    [Follower/partner]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Partner
                            [Partner/id]
                                1
                            [Partner/name]
                                François Perusse
            @testEnv
            .{Record/insert}
                [Record/traits]
                    FollowerComponent
                [FollowerComponent/follower]
                    @follower
            {Test/assert}
                [0]
                    @record
                [1]
                    @follower
                    .{Follower/followerComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have follower component
            {Test/assert}
                [0]
                    @record
                [1]
                    @follower
                    .{Follower/followerComponents}
                    .{Collection/first}
                    .{FollowerComponent/details}
                [2]
                    should display a details part
            {Test/assert}
                [0]
                    @record
                [1]
                    @follower
                    .{Follower/followerComponents}
                    .{Collection/first}
                    .{FollowerComponent/avatar}
                [2]
                    should display the avatar of the follower
            {Test/assert}
                [0]
                    @record
                [1]
                    @follower
                    .{Follower/followerComponents}
                    .{Collection/first}
                    .{FollowerComponent/name}
                [2]
                    should display the name of the follower
            {Test/assert}
                [0]
                    @record
                [1]
                    @follower
                    .{Follower/followerComponents}
                    .{Collection/first}
                    .{FollowerComponent/editButton}
                [2]
                    should have an edit button
            {Test/assert}
                [0]
                    @record
                [1]
                    @follower
                    .{Follower/followerComponents}
                    .{Collection/first}
                    .{FollowerComponent/removeButton}
                [2]
                    should have a remove button
`;
