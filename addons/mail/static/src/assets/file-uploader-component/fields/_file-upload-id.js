/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            _fileUploadId
        [Field/model]
            FileUploaderComponent
        [Field/type]
            attr
        [Field/target]
            String
        [Field/default]
            {UnderscoreJS/uniqueId}
                o-FileUploaderComponent-fileupload
`;
