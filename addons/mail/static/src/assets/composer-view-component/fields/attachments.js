/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachments
        [Field/model]
            ComposerViewComponent
        [Field/type]
            m2o
        [Field/target]
            Attachment
        [Field/isRequired]
            true
`;
