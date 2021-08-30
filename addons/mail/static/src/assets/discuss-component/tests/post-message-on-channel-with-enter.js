/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            post message on channel with "Enter" keyboard shortcut
        [Test/model]
            DiscussComponent
        [Test/assertions]
            2
        [Test/scenario]
            {Dev/comment}
                channel expected to be found in the sidebar
                with a random unique id that will be referenced in the test
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
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            @testEnv
            .{Thread/open}
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        20
                    [Thread/model]
                        mail.channel
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        0
                [2]
                    should not have any message initially in channel

            {Dev/comment}
                insert some HTML in editable
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/focus}
                        @testEnv
                        .{Discuss/thread}
                        .{Thread/composer}
                        .{Composer/composerTextInputComponents}
                        .{Collection/first}
                        .{ComposerTextInputComponent/textarea}
                    @testEnv
                    .{UI/insertText}
                        Test
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/keydown}
                        [0]
                            @testEnv
                            .{Discuss/thread}
                            .{Thread/composer}
                            .{Composer/composerTextInputComponents}
                            .{Collection/first}
                            .{ComposerTextInputComponent/textarea}
                        [1]
                            [key]
                                Enter
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should now have single message in channel after posting message from pressing 'Enter' in text input of composer
`;
