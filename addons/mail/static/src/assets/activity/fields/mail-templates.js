/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            mailTemplates
        [Field/model]
            Activity
        [Field/type]
            m2m
        [Field/target]
            MailTemplate
        [Field/inverse]
            MailTemplate/activities
`;
