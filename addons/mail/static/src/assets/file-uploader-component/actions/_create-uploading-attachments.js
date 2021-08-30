/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            FileUploaderComponent/_createUploadingAttachments
        [Action/params]
            files
                [type]
                    web.FileList
                    .{|}
                        Array
            record
                [type]
                    FileUploaderComponent
        [Action/behavior]
            {foreach}
                @files
            .{as}
                file
            .{do}
                {Record/insert}
                    [Record/traits]
                        Attachment
                    [Attachment/filename]
                        @file
                        .{web.File/name}
                    [Attachment/isUploading]
                        true
                    [Attachment/name]
                        @file
                        .{web.File/name}
                    [Attachment/mimetype]
                        @file
                        .{web.File/type}
                    @record
                    .{FileUploaderComponent/newAttachmentExtraData}
`;
