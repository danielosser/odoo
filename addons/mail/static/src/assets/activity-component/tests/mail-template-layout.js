/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            mail template layout
        [Test/model]
            ActivityComponent
        [Test/assertions]
            8
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :activity
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Activity
                    [Activity/id]
                        12
                    [Activity/mailTemplates]
                        @testEnv
                        .{Field/add}
                            @testEnv
                            .{Record/insert}
                                [Record/traits]
                                    MailTemplate
                                [MailTemplate/id]
                                    1
                                [MailTemplate/name]
                                    Dummy mail template
                    [Activity/thread]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Thread
                            [Thread/id]
                                42
                            [Thread/model]
                                res.partner
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ActivityComponent
                [ActivityComponent/activity]
                    @activity
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have activity component
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/length}
                    .{ActivityComponent/sidebar}
                []
                    should have activity sidebar
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/mailTemplates}
                []
                    should have activity mail templates
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{ActivityComponent/mailTemplate}
                []
                    should have activity mail template
            {Test/assert}
                []
                    @activity
                    .{Activity/mailTemplates}
                    .{Collection/first}
                    .{MailTemplate/mailTemplateComponents}
                    .{Collection/length}
                    .{=}
                        1
                []
                    should have activity mail template name
            {Test/assert}
                []
                    @activity
                    .{Activity/mailTemplates}
                    .{Collection/first}
                    .{MailTemplate/mailTemplateComponents}
                    .{Collection/first}
                    .{MailTemplateComponent/name}
                    .{web.Element/textContent}
                    .{=}
                        Dummy mail template
                []
                    should have activity mail template name
            {Test/assert}
                []
                    @activity
                    .{Activity/mailTemplates}
                    .{Collection/first}
                    .{MailTemplate/mailTemplateComponents}
                    .{Collection/first}
                    .{MailTemplateComponent/preview}
                []
                    should have activity mail template name preview button
            {Test/assert}
                []
                    @activity
                    .{Activity/mailTemplates}
                    .{Collection/first}
                    .{MailTemplate/mailTemplateComponents}
                    .{Collection/first}
                    .{MailTemplateComponent/send}
                []
                    should have activity mail template name send button
`;
