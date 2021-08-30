/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            add emoji replaces text selection
        [Test/model]
            ComposerViewComponent
        [Test/assertions]
            2
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
                    20
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
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
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/focus}
                        @thread
                        .{Thread/composer}
                        .{Composer/composerTextInputComponents}
                        .{Collection/first}
                        .{ComposerTextInputComponent/textarea}
                    @testEnv
                    .{UI/insertText}
                        Blabla
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
                    .{=}
                        Blabla
                []
                    composer text input should have text only initially

            {Dev/comment}
                simulate selection of all the content by keyboard
            @testEnv
            .{UI/setSelectionRange}
                [0]
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
                [1]
                    0
                [2]
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
                    .{String/length}
            {Dev/comment}
                select emoji
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @thread
                        .{Thread/composer}
                        .{Composer/composerViewComponents}
                        .{Collection/first}
                        .{ComposerViewComponent/buttonEmojis}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/all}
                            [Record/traits]
                                EmojisPopoverComponent
                        .{Collection/first}
                        .{EmojisPopoverComponent/emojis}
                        .{Collection/find}
                            {func}
                                [in]
                                    emoji
                                [out]
                                    @emoji
                                    .{Emoji/unicode}
                                    .{=}
                                        😊
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
                    .{=}
                        😊
                []
                    whole text selection should have been replaced by emoji
            {Dev/comment}
                ensure popover is closed
            @testEnv
            .{Utils/nextAnimationFrame}
            @testEnv
            .{Utils/nextAnimationFrame}
            @testEnv
            .{Utils/nextAnimationFrame}
`;
