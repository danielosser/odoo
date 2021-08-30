/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            minScale
        [Field/model]
            AttachmentViewerComponent
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/default]
            0.5
`;
