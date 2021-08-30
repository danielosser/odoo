/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            current partner is typing should not translate on textual typing status
        [Test/model]
            ComposerViewComponent
        [Test/assertions]
            3
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
                    should have notified current partner typing status

            @testEnv
            .{Utils/nextAnimationFrame}
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/first}
                    .{ComposerViewComponent/threadTextualTypingStatus}
                    .{web.Element/textContent}
                    .{=}
                        {String/empty}
                []
                    Thread textual typing status bar should not display current partner is typing
`;
