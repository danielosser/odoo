/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            uploadButton
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            button
        [Model/traits]
            ActivityComponent/toolButton
        [web.Element/class]
            btn
            btn-link
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/category}
            .{=}
                upload_file
        [Element/onClick]
            {FileUploaderComponent/openBrowserFileUploader}
                @record
                .{ActivityComponent/fileUploader}
`;
