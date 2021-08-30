/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            mention a channel after some text
        [Test/model]
            ComposerViewComponent
        [Test/assertions]
            5
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
                    7
                [mail.channel/name]
                    General
                [mail.channel/public]
                    groups
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
                        7
                    [Thread/model]
                        mail.channel
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ComposerViewComponent
                [ComposerViewComponent/composer]
                    @thread
                    .{Thread/composer}
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerSuggestionListComponents}
                    .{Collection/length}
                    .{=}
                        0
                []
                    channel mention suggestions list should not be present
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
                    text content of composer should be empty initially

            @testEnv
            .{UI/focus}
                @thread
                .{Thread/composer}
                .{Composer/composerTextInputComponents}
                .{Collection/first}
                .{ComposerTextInputComponent/textarea}
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/insertText}
                        bluhbluh 
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
                    .{=}
                        bluhbluh 
                []
                    text content of composer should have content

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/insertText}
                        #
                    @testEnv
                    .{UI/keydown}
                        @thread
                        .{Thread/composer}
                        .{Composer/composerTextInputComponents}
                        .{Collection/first}
                        .{ComposerTextInputComponent/textarea}
                    @testEnv
                    .{UI/keyup}
                        @thread
                        .{Thread/composer}
                        .{Composer/composerTextInputComponents}
                        .{Collection/first}
                        .{ComposerTextInputComponent/textarea}
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerSuggestionListComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have a channel mention suggestion

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @thread
                        .{Thread/composer}
                        .{Composer/composerSuggestionListComponents}
                        .{Collection/first}
                        .{ComposerSuggestionListComponent/itemMain}
                        .{Collection/first}
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerTextInputComponents}
                    .{Collection/first}
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
                    .{=}
                        bluhbluh #General 
                []
                    text content of composer should have previous content + mentioned channel + additional whitespace afterwards
`;
