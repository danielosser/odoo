/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mailTemplateForeach
        [Element/model]
            ActivityComponent
        [Model/traits]
            Foreach
        [Foreach/collection]
            @record
            .{ActivityComponent/activity}
            .{Activity/mailTemplates}
        [Foreach/as]
            mailTemplate
        [Element/key]
            @field
            .{Foreach/get}
                mailTemplate
            .{Record/id}
        [Field/target]
            ActivityComponent:mailTemplate
        [ActivityComponent:mailTemplate/mailTemplate]
            @field
            .{Foreach/get}
                mailTemplate
`;
