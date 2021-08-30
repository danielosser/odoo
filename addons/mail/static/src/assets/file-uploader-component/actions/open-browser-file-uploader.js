/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            FileUploaderComponent/openBrowserFileUploader
        [Action/params]
            record
                [type]
                    FileUplaoderComponent
        [Action/behavior]
            {UI/click}
                @record
                .{FileUploaderComponent/input}
`;
