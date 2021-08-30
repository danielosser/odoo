/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            add an attachment
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
                [ComposerViewComponent/attachmentsDetailsMode]
                    card
                [ComposerViewComponent/composer]
                    @thread
                    .{Thread/composer}
            :file
                {Record/insert}
                    [Record/traits]
                        web.File
                    [web.File/content]
                        hello, world
                    [web.File/contentType]
                        text/plain
                    [web.File/name]
                        text.txt
            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/inputFiles}
                        [0]
                            @thread
                            .{Thread/composer}
                            .{Composer/composerViewComponents}
                            .{Collection/first}
                            .{ComposerViewComponent/fileUploader}
                            .{FileUploaderComponent/input}
                        [1]
                            @file
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/first}
                    .{ComposerViewComponent/attachmentList}
                []
                    should have an attachment list
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/attachments}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have an attachment
`;
