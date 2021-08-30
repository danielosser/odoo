/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States which attachments are currently being created in this composer.
    {Field}
        [Field/name]
            attachments
        [Field/model]
            Composer
        [Field/type]
            o2m
        [Field/target]
            Attachment
        [Field/inverse]
            Attachment/composer
`;
