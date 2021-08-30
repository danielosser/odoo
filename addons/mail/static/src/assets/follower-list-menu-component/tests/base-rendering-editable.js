/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            base rendering editable
        [Test/model]
            FollowerListMenuComponent
        [Test/assertions]
            5
        [scenario]
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
            @testEnv
            .{Record/insert}
                [Record/traits]
                    FollowerListMenuComponent
                [FollowerListMenuComponent/thread]
                    @thread
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followerListMenuComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have followers menu component
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followerListMenuComponents}
                    .{Collection/first}
                    .{FollowerListMenuComponent/buttonFollowers}
                [2]
                    should have followers button
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followerListMenuComponents}
                    .{Collection/first}
                    .{FollowerListMenuComponent/buttonFollowers}
                    .{web.Element/isDisabled}
                    .{isFalsy}
                [2]
                    followers button should not be disabled
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followerListMenuComponents}
                    .{Collection/first}
                    .{FollowerListMenuComponent/dropdown}
                    .{isFalsy}
                [2]
                    followers dropdown should not be opened

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @thread
                        .{Thread/followerListMenuComponents}
                        .{Collection/first}
                        .{FollowerListMenuComponent/buttonFollowers}
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followerListMenuComponents}
                    .{Collection/first}
                    .{FollowerListMenuComponent/dropdown}
                [2]
                    followers dropdown should be opened
`;
