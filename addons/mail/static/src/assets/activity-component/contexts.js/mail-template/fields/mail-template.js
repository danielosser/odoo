/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            mailTemplate
        [Field/model]
            ActivityComponent:mailTemplate
        [Field/type]
            m2o
        [Field/target]
            MailTemplate
        [Field/isRequired]
            true
`;
