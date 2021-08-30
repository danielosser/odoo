/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            mailTemplate
        [Field/model]
            MailTemplateComponent
        [Field/type]
            m2o
        [Field/target]
            MailTemplate
        [Field/isRequired]
            true
`;
