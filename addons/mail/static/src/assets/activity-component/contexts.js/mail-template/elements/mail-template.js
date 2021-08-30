/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mailTemplate
        [Element/model]
            ActivityComponent:mailTemplate
        [Field/target]
            MailTemplateComponent
        [MailTemplateComponent/activity]
            @record
            .{ActivityComponent/activity}
        [MailTemplateComponent/mailTemplate]
            @record
            .{ActivityComponent:mailTemplate/mailTemplate}
`;
