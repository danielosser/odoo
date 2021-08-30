/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            mediaPreview
        [Field/model]
            MediaPreviewComponent
        [Field/type]
            m2o
        [Field/target]
            MediaPreview
`;
