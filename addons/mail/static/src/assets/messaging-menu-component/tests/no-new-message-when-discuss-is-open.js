/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            no new message when discuss is open
        [Test/model]
            MessagingMenuComponent
        [Test/assertions]
            3
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
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        MessagingMenuComponent
                []
                    [Record/traits]
                        DiscussComponent
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/toggler}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/newMessageButton}
                    .{isFalsy}
                [2]
                    should not have 'new message' when discuss is open

            {Dev/comment}
                simulate closing discuss app
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{Discuss/close}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/newMessageButton}
                [2]
                    should have 'new message' when discuss is closed

            {Dev/comment}
                simulate opening discuss app
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{Discuss/open}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/newMessageButton}
                    .{isFalsy}
                [2]
                    should not have 'new message' when discuss is open again
`;
