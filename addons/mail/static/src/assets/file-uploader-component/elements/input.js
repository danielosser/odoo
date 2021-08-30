/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            input
        [Element/model]
            FileUploaderComponent
        [web.Element/tag]
            input
        [Element/onChange]
            {FileUploaderComponent/uploadFiles}
                @record
                @ev
                .{web.ChangeEvent/target}
                .{web.Element/files}
        [web.Element/multiple]
            true
        [web.Element/type]
            file
        [Element/t-key]
            fileInput
        [web.Element/style]
            [web.scss/display]
                none
                !important
`;
