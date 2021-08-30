/** @odoo-module **/

import { Define } from '@mail/define';

import { csrf_token } from 'web.core';

export default Define`
    {Action}
        [Action/name]
            FileUploaderComponent/_createFormData
        [Action/params]
            composer
                [type]
                    Composer
            file
                [type]
                    web.File
            thread
                [type]
                    Thread
            record
                [type]
                    FileUploaderComponent
        [Action/returns]
            web.FormData
        [Action/behavior]
            {Record/insert}
                [Record/traits]
                    web.FormData
                [csrf_token]
                    ${csrf_token}
                [is_pending]
                    @composer
                    .{toBoolean}
                [thread_id]
                    @thread
                    .{Thread/id}
                [thread_model]
                    @thread
                    .{Thread/model}
                [ufile]
                    file
`;
