/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            data-oe-id & data-oe-model link redirection on click
        [Test/model]
            ActivityComponent
        [Test/assertions]
            7
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
                                    action should open view
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        action
                                    .{Dict/get}
                                        res_model
                                    .{=}
                                        some.model
                                []
                                    action should open view on 'some.model' model
                            {Test/assert}
                                []
                                    @payload
                                    .{Dict/get}
                                        action
                                    .{Dict/get}
                                        res_id
                                    .{=}
                                        250
                                []
                                    action should open view on 250
                            {Test/step}
                                do-action:openFormView_some.model_250
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
                    [Activity/canWrite]
                        true
                    [Activity/category]
                        not_upload_file
                    [Activity/id]
                        12
                    [Activity/note]
                        <p><a href="#" data-oe-id="250" data-oe-model="some.model">some.model_250</a></p>
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
                    .{Collection/first}
                    .{Activity/note}
                []
                    activity should have a note
            {Test/assert}
                []
                    @activity
                    .{Activity/activityComponents}
                    .{Collection/first}
                    .{Activity/note}
                    .{web.Element/htmlContent}
                    .{String/includes}
                        <a
                []
                    activity note should have a link

            @testEnv
            .{UI/click}
                @activity
                .{Activity/activityComponents}
                .{Collection/first}
                .{Activity/note}
                .{web.Element/htmlContent}
                .{web.Document/querySelector}
                    a
            {Test/verifySteps}
                []
                    do-action:openFormView_some.model_250
                []
                    should have open form view on related record after click on link
`;
