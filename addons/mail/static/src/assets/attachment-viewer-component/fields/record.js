/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            record
        [Field/model]
            AttachmentViewerComponent
        [Field/type]
            m2o
        [Field/target]
            AttachmentViewer
        [Field/isRequired]
            true
`;
