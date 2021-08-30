/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            Group chat should be displayed inside the chat section of the messaging menu
        [Test/model]
            MessagingMenuComponent
        [Test/assertions]
            1
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    mail.channel
                [mail.channel/id]
                    11
                [mail.channel/channel_type]
                    group
                [mail.channel/is_pinned]
                    true
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            @testEnv
            .{Record/insert}
                [Record/traits]
                    MessagingMenuComponent
            @testEnv
            .{UI/afterNextRender}
                {func}
                    {UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/toggler}
            @testEnv
            .{UI/afterNextRender}
                {func}
                    {UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/tabChat}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Thread/id]
                            11
                        [Thread/model]
                            mail.channel
                    .{Thread/threadPreviewComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have one preview of group 
`;
