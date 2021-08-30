/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            messaging becomes initialized
        [Test/model]
            MessagingMenuComponent
        [Test/assertions]
            2
        [Test/scenario]
            :messagingInitialized
                {Record/insert}
                    [Record/traits]
                        Deferred
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/waitUntilMessagingCondition]
                        created
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
                [Server/mockRPC]
                    {func}
                        [in]
                            route
                            args
                            original
                        [out]
                            {if}
                                @route
                                .{=}
                                    /mail/init_messaging
                            .{then}
                                {Promise/await}
                                    @messagingInitialized
                            @original
            @testEnv
            .{Record/insert}
                [Record/traits]
                    MessagingMenuComponent
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{MessagingMenu/messagingMenuComponents}
                        .{Collection/first}
                        .{MessagingMenuComponent/toggler}

            {Dev/comment}
                simulate messaging becomes initialized
            @testEnv
            .{Component/afterNextRender}
                {func}
                    {Promise/resolve}
                        @messagingInitialized
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/loading}
                    .{isFalsy}
                [2]
                    should no longer display loading icon on messaging menu when messaging becomes initialized
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/dropdownLoadingLabel}
                    .{isFalsy}
                [2]
                    should no longer prompt loading when opening messaging menu when messaging becomes initialized
`;
