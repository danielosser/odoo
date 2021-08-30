/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            mail template: preview mail
        [Test/model]
            ActivityComponent
        [Test/assertions]
            10
        [Test/scenario]
            :bus
                {Record/insert}
                    [Record/traits]
                        Bus
            {Bus/on}
                [0]
                    @bus
                [1]
                    do-action
                [2]
                    null
                [3]
                    {func}
                        [in]
                            payload
                        [out]
                            {Test/step}
                                do_action
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        action
                                    .{Dict/get}
                                        context
                                    .{Dict/get}
                                        default_res_id
                                    .{=}
                                        42
                                []
                                    Action should have the activity res id as default res id in context
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        action
                                    .{Dict/get}
                                        context
                                    .{Dict/get}
                                        default_model
                                    .{=}
                                        res.partner
                                []
                                    Action should have the activity res model as default model in context
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        action
                                    .{Dict/get}
                                        context
                                    .{Dict/get}
                                        default_use_template
                                []
                                    Action should have true as default use_template in context
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        action
                                    .{Dict/get}
                                        context
                                    .{Dict/get}
                                        default_template_id
                                    .{=}
                                        1
                                []
                                    Action should have the selected mail template id as default template id in context
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        action
                                    .{Dict/get}
                                        type
                                    .{=}
                                        ir.actions.act_window
                                []
                                    Action should be of type "ir.actions.act_window"
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        action
                                    .{Dict/get}
                                        res_model
                                    .{=}
                                        mail.compose.message
                                []
                                    Action should have "mail.compose.message" as res_model
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
                    [Env/owlEnv]
                        [bus]
                            @bus
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
                    .{Collection/first}
                    .{ActivityComponent/preview}
                []
                    should have activity mail template name preview button

            @testEnv
            .{UI/click}
                @activity
                .{Activity/mailTemplates}
                .{Collection/first}
                .{MailTemplate/mailTemplateComponents}
                .{Collection/first}
                .{MailTemplateComponent/preview}
            {Test/verifySteps}
                []
                    do_action
                []
                    should have called 'compose email' action correctly
`;
