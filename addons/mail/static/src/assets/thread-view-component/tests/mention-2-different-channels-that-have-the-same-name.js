/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            mention 2 different channels that have the same name
        [Test/model]
            ThreadViewComponent
        [Test/assertions]
            3
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        11
                    [mail.channel/name]
                        my channel
                    [mail.channel/public]
                        public
                        {Dev/comment}
                            mentioning another channel is possible only from a public channel
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        12
                    [mail.channel/name]
                        my channel
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
                        11
                    [Thread/model]
                        mail.channel
            :threadViewer
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        ThreadViewer
                    [ThreadViewer/hasThreadView]
                        true
                    [ThreadViewer/thread]
                        @thread
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ThreadViewComponent
                [ThreadViewComponent/threadView]
                    @threadViewer
                    .{ThreadViewer/threadView}
            {UI/focus}
                @threadViewer
                .{ThreadViewer/threadView}
                .{ThreadView/thread}
                .{Thread/composer}
                .{Composer/composerTextInputComponents}
                .{Collection/first}
                .{ComposerTextInputComponent/textarea}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    {foreach}
                        #
                        m
                        y
                    .{as}
                        char
                    .{do}
                        @testEnv
                        .{UI/insertText}
                            @char
                        @testEnv
                        .{UI/keydown}
                            @threadViewer
                            .{ThreadViewer/threadView}
                            .{ThreadView/thread}
                            .{Thread/composer}
                            .{Composer/composerTextInputComponents}
                            .{Collection/first}
                            .{ComposerTextInputComponent/textarea}
                        @testEnv
                        .{UI/keyup}
                            @threadViewer
                            .{ThreadViewer/threadView}
                            .{ThreadView/thread}
                            .{Thread/composer}
                            .{Composer/composerTextInputComponents}
                            .{Collection/first}
                            .{ComposerTextInputComponent/textarea}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @threadViewer
                        .{ThreadViewer/threadView}
                        .{ThreadView/thread}
                        .{Thread/composer}
                        .{Composer/composerSuggestionComponents}
                        .{Collection/first}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    {foreach}
                        #
                        m
                        y
                    .{as}
                        char
                    .{do}
                        @testEnv
                        .{UI/insertText}
                            @char
                        @testEnv
                        .{UI/keydown}
                            @threadViewer
                            .{ThreadViewer/threadView}
                            .{ThreadView/thread}
                            .{Thread/composer}
                            .{Composer/composerTextInputComponents}
                            .{Collection/first}
                            .{ComposerTextInputComponent/textarea}
                        @testEnv
                        .{UI/keyup}
                            @threadViewer
                            .{ThreadViewer/threadView}
                            .{ThreadView/thread}
                            .{Thread/composer}
                            .{Composer/composerTextInputComponents}
                            .{Collection/first}
                            .{ComposerTextInputComponent/textarea}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @threadViewer
                        .{ThreadViewer/threadView}
                        .{ThreadView/thread}
                        .{Thread/composer}
                        .{Composer/composerSuggestionComponents}
                        .{Collection/second}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @threadViewer
                        .{ThreadViewer/threadView}
                        .{ThreadView/thread}
                        .{Thread/composer}
                        .{Composer/composerViewComponents}
                        .{Collection/first}
                        .{ComposerViewComponent/buttonSend}
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have one message after posting it
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/content}
                    .{web.Element/htmlContent}
                    .{String/includes}
                        .o_channel_redirect[data-oe-id="11"][data-oe-model="mail.channel"]:contains("#my channel")
                [2]
                    message should contain the first channel mention
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/content}
                    .{web.Element/htmlContent}
                    .{String/includes}
                        .o_channel_redirect[data-oe-id="12"][data-oe-model="mail.channel"]:contains("#my channel")
                [2]
                    message should also contain the second channel mention
`;
