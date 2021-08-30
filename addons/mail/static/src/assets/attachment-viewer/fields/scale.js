/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Scale size of the image. Changes when user zooms in/out.
    {Field}
        [Field/name]
            scale
        [Field/model]
            AttachmentViewer
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/default]
            1
`;
