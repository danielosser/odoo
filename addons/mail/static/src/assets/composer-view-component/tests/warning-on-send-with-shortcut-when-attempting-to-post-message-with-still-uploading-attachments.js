/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            warning on send with shortcut when attempting to post message with still-uploading attachments
        [Test/model]
            ComposerViewComponent
        [Test/assertions]
            7
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/owlEnv]
                        [services]
                            [notification]
                                [notify]
                                    {func}
                                        [in]
                                            params
                                        [out]
                                            {Test/assert}
                                                []
                                                    @params
                                                    .{Dict/get}
                                                        message
                                                    .{=}
                                                        Please wait while the file is uploading.
                                                []
                                                    notification content should be about the uploading file
                                            {Test/assert}
                                                []
                                                    @params
                                                    .{Dict/get}
                                                        type
                                                    .{=}
                                                        warning
                                                []
                                                    notification should be a warning
                                            {Test/step}
                                                notification
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Record/data}
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
                                {Dev/comment}
                                    simulates attachment is never finished uploading
                                {Promise/await}
                            @original
            :thread
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Thread
                    [Thread/composer]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Composer
                            [Composer/isLog]
                                false
                    [Thread/id]
                        20
                    [Thread/model]
                        res.partner
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ComposerViewComponent
                [ComposerViewComponent/composer]
                    @thread
                    .{Thread/composer}
                [ComposerViewComponent/textInputSendShortcuts]
                    enter
            :file
                @testEnv
                .{Record/insert}
                    [Record/insert]
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
                    should have only one attachment
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

            {Dev/comment}
                Try to send message
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
            {Test/verifySteps}
                []
                    notification
                []
                    should have triggered a notification for inability to post message at the moment (some attachments are still being uploaded)
`;
