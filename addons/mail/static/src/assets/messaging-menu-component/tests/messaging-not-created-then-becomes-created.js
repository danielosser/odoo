/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            messaging not created then becomes created
        [Test/model]
            MessagingMenuComponent
        [Test/isTechnical]
            true
        [Test/assertions]
            2
        [Test/scenario]
            {Dev/comment}
                Creation of messaging in env is async due to generation of models being
                async. Generation of models is async because it requires parsing of all
                JS modules that contain pieces of model definitions.

                Time of having no messaging is very short, almost imperceptible by user
                on UI, but the display should not crash during this critical time period.
            :def
                {Record/insert}
                    [Record/traits]
                        Deferred
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/beforeGenerateModels]
                        {func}
                            {Promise/await}
                                @def
                    [Env/waitUntilMessagingCondition]
                        none
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
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have messaging menu even when messaging is not yet created

            {Dev/comment}
                simulate messaging becoming created
            {Promise/resolve}
                @def
            {Utils/nextAnimationFrame}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should still contain messaging menu after messaging has been created
`;
