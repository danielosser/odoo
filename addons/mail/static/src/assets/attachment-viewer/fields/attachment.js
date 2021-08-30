/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachment
        [Field/model]
            AttachmentViewer
        [Field/type]
            m2o
        [Field/target]
            Attachment
`;
