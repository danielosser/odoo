/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            paste attachments
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
            :files
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        web.File
                    [web.File/content]
                        hello, world
                    [web.File/contentType]
                        text/plain
                    [web.File/name]
                        text.txt
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/attachments}
                    .{Collection/length}
                    .{=}
                        0
                []
                    should not have any attachment in the composer before paste

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{Utils/pasteFiles}
                        [0]
                            @thread
                            .{Thread/composer}
                            .{Composer/composerTextInputComponents}
                            .{Collection/first}
                        [1]
                            @files
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/attachments}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have 1 attachment in the composer after paste
`;
