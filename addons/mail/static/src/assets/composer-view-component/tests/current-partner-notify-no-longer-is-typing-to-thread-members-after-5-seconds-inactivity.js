/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            current partner notify no longer is typing to thread members after 5 seconds inactivity
        [Test/model]
            ComposerViewComponent
        [Test/assertions]
            4
        [Test/scenario]
            {Dev/comment}
                channel that is expected to be rendered
                with a random unique id that will be referenced in the test
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/usingTimeControl]
                        true
            @testEnv
            .{Record/insert}
                [Record/traits]
                    mail.channel
                [mail.channel/id]
                    20
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
                                @args
                                .{Dict/get}
                                    method
                                .{=}
                                    notify_typing
                            .{then}
                                {Test/step}
                                    notify_typing:
                                    .{+}
                                        @args
                                        .{Dict/get}
                                            kwargs
                                        .{Dict/get}
                                            is_typing
                            @original
            :thread
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ComposerViewComponent
                [ComposerViewComponent/composer]
                    @thread
                    .{Thread/composer}
                [ComposerViewComponent/hasThreadTyping]
                    true
            @testEnv
            .{UI/focus}
                @thread
                .{Thread/composer}
                .{Composer/composerTextInputComponents}
                .{Collection/first}
                .{ComposerTextInputComponent/textarea}
            @testEnv
            .{UI/insertText}
                a
            @testEnv
            .{UI/keydown}
                [0]
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                [1]
                    [key]
                        a
            {Test/verifySteps}
                []
                    notify_typing:true
                []
                    should have notified current partner is typing

            @testEnv
            .{Time/advance}
                5000
            {Test/verifySteps}
                []
                    notify_typing:false
                []
                    should have notified current partner no longer is typing (inactive for 5 seconds)
`;
