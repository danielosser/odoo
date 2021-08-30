/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States on which composer this attachment is currently being created.
    {Field}
        [Field/name]
            composer
        [Field/model]
            Attachment
        [Field/type]
            m2o
        [Field/target]
            Composer
        [Field/inverse]
            Composer/attachments
`;
