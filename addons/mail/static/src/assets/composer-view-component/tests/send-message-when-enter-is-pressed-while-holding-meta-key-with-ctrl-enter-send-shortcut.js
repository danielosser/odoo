/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            send message when enter is pressed while holding meta key (this shortcut is available)
        [Test/model]
            ComposerViewComponent
        [Test/assertions]
            5
        [Test/scenario]
            {Dev/comment}
                Note that test doesn't assert ENTER makes no newline, because this
                default browser cannot be simulated with just dispatching
                programmatically crafted events...
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
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
                                @route
                                .{=}
                                    /mail/message/post
                            .{then}
                                {Test/step}
                                    message_post
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
                [ComposerViewComponent/textInputSendShortcuts]
                    meta-enter
            {Dev/comment}
                Type message
            @testEnv
            .{UI/focus}
                @thread
                .{Thread/composer}
                .{Composer/composerTextInputComponents}
                .{Collection/first}
                .{ComposerTextInputComponent/textarea}
            @testEnv
            .{UI/insertText}
                test message
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
                    .{=}
                        test message
                []
                    should have inserted text content in editable

            @testEnv
            .{Component/afterNextRender}
                {func}
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
                                Enter
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
                    .{=}
                        test message
                []
                    should have inserted text content in editable as message has not been posted

            {Dev/comment}
                Send message with meta+enter
            @testEnv
            .{Component/afterNextRender}
                {func}
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
                                Enter
                            [metaKey]
                                true
            {Test/verifySteps}
                message_post
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
                    .{=}
                        {String/empty}
                []
                    should have no content in composer input as message has been posted
`;
