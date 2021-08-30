/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            messaging not initialized
        [Test/model]
            MessagingMenuComponent
        [Test/assertions]
            2
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/waitUntilMessagingCondition]
                        created
            @testEnv
            .[Record/insert]
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
                                    {Dev/comment}
                                        simulate messaging never initialized
                                    {Promise/await}
                                @original
            @testEnv
            .{Record/insert}
                [Record/traits]
                    MessagingMenuComponent
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/loading}
                [2]
                    should display loading icon on messaging menu when messaging not yet initialized

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
                    .{MessagingMenuComponent/dropdownLoadingLabel}
                [2]
                    should prompt loading when opening messaging menu
`;
