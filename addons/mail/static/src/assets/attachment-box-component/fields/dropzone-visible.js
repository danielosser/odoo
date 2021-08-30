/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            dropzoneVisible
        [Field/model]
            AttachmentBoxComponent
        [Field/type]
            m2o
        [Field/target]
            DropzoneVisibleComponentHook
`;
