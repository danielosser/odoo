/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            base rendering not editable
        [Test/model]
            FollowerListMenuComponent
        [Test/assertions]
            5
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
            @testEnv
            .{Record/insert}
                [Record/traits]
                    FollowerListMenuComponent
                [FollowerListMenuComponent/thread]
                    @thread
                [FollowerListMenuComponent/isDisabled]
                    true
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
                [2]
                    followers button should be disabled
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
                    .{isFalsy}
                [2]
                    followers dropdown should still be closed as button is disabled
`;
