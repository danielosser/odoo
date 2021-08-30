/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            thread
        [Field/model]
            ThreadPreviewComponent
        [Field/type]
            m2o
        [Field/isRequired]
            true
`;
