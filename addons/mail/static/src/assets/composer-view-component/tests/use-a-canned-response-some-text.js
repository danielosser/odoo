/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            use a canned response some text
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
                [0]
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        20
                [1]
                    [Record/traits]
                        mail.shortcode
                    [mail.shortcode/id]
                        11
                    [mail.shortcode/source]
                        hello
                    [mail.shortcode/substitution]
                        Hello! How are you?
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
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerSuggestionListComponents}
                    .{Collection/length}
                    .{=}
                        0
                []
                    canned response suggestions list should not be present
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
                        :
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
                    .{Collection/first}
                    .{ComposerSuggestionListComponent/itemMain}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have a canned response suggestion

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
                        bluhbluh Hello! How are you? 
                []
                    text content of composer should have previous content + canned response substitution + additional whitespace afterwards
`;
