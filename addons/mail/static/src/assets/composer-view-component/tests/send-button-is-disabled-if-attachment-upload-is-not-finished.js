/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            send button is disabled if attachment upload is not finished
        [Test/model]
            ComposerViewComponent
        [Test/assertions]
            8
        [Test/scenario]
            :attachmentUploadedPromise
                {Record/insert}
                    [Record/traits]
                        Deferred
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
                [Server/mockFetch]
                    {func}
                        [in]
                            resource
                            init
                            original
                        [out]
                            {if}
                                @resource
                                .{=}
                                    /mail/attachment/upload
                            .{then}
                                {Promise/await}
                                    @attachmentUploadedPromise
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
            :file
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
                    .{Composer/attachments}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have an attachment after a file has been input
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/attachments}
                    .{Collection/first}
                    .{Attachment/isUploading}
                []
                    attachment displayed is being uploaded
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/first}
                    .{ComposerViewComponent/buttonSend}
                []
                    composer send button should be displayed
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/first}
                    .{ComposerViewComponent/buttonSend}
                    .{web.Element/isDisabled}
                []
                    composer send button should be disabled as attachment is not yet uploaded

            {Dev/comment}
                simulates attachment finishes uploading
            @testEnv
            .{Component/afterNextRender}
                {func}
                    {Promise/resolve}
                        @attachmentUploadedPromise
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/attachments}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have only one attachment
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/attachments}
                    .{Collection/first}
                    .{Attachment/isUploading}
                    .{isFalsy}
                []
                    attachment displayed should be uploaded
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/first}
                    .{ComposerViewComponent/buttonSend}
                []
                    composer send button should still be present
            {Test/assert}
                []
                    @thread
                    .{Thread/composer}
                    .{Composer/composerViewComponents}
                    .{Collection/first}
                    .{ComposerViewComponent/buttonSend}
                    .{web.Element/isDisabled}
                    .{isFalsy}
                []
                    composer send button should be enabled as attachment is now uploaded
`;
