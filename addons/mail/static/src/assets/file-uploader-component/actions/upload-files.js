/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            FileUploaderComponent/uploadFiles
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
            {FileUploaderConponent/_performUpload}
                [0]
                    @record
                [1]
                    [composer]
                        @record
                        .{FileUploaderConponent/composerView}
                        .{&}
                            @record
                            .{FileUploaderConponent/composerView}
                            .{ComposerView/composer}
                    [files]
                        @files
                    [thread]
                        @record
                        .{FileUploaderConponent/thread}
            {Record/update}
                [0]
                    @record
                    .{FileUploaderComponent/input}
                [1]
                    [web.Element/value]
                        {Record/empty}
`;
