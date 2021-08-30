/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            no conflicts between file uploaders
        [Test/model]
            FileUploaderComponent
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
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :fileUploader1
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        FileUploaderComponent
            :fileUploader2
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        FileUploaderComponent
            :file1
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        web.File
                    [web.File/content]
                        hello, world
                    [web.File/contentType]
                        text/plain
                    [web.File/name]
                        text1.txt
            @testEnv
            .{UI/inputFiles}
                [0]
                    @fileUploader1
                    .{FileUploaderComponent/input}
                [1]
                    @file1
            {Utils/nextAnimationFrame}
            {Dev/comment}
                we can't use afterNextRender as fileInput are display:none
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            Attachment
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    Uploaded file should be the only attachment created

            :file2
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        web.File
                    [web.File/content]
                        hello, world
                    [web.File/contentType]
                        text/plain
                    [web.File/name]
                        text2.txt
            @testEnv
            .{UI/inputFiles}
                [0]
                    @fileUploader2
                    .{FileUploaderComponent/input}
                [1]
                    @file2
            {Utils/nextAnimationFrame}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            Attachment
                    .{Collection/length}
                    .{=}
                        2
                [2]
                    Uploaded file should be the only attachment added
`;
