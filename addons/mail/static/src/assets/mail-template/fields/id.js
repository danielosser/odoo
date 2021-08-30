/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            id
        [Field/model]
            MailTemplate
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;
