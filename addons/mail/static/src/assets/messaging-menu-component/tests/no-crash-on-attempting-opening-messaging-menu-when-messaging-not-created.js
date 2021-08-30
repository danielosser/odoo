/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            no crash on attempting opening messaging menu when messaging not created
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

                Messaging menu is not expected to be open on click because state of
                messaging menu requires messaging being created.
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/beforeGenerateModels]
                        {func}
                            {Dev/comment}
                                keep messaging not created
                            {Promise/await}
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

            {try}
                @testEnv
                .{UI/click}
                    @testEnv
                    .{MessagingMenu/messagingMenuComponents}
                    .{Collection/first}
                    .{MessagingMenuComponent/toggler}
                {Utils/nextAnimationFrame}
            .{catch}
                {func}
                    [in]
                        err
                    [out]
                        :error
                            @err
            {Test/assert}
                [0]
                    @record
                [1]
                    @error
                    .{isFalsy}
                [2]
                    Should not crash on attempt to open messaging menu when messaging not created
            {if}
                @error
            .{then}
                {Error/raise}
                    @error
`;
