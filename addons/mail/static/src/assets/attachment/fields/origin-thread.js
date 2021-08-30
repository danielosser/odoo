/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            originThread
        [Field/model]
            Attachment
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/originThreadAttachments
`;
