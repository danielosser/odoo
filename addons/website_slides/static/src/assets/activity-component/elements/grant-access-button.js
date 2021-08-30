/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            grantAccessButton
        [Element/feature]
            website_slides
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            button
        [Model/traits]
            ActivityComponent/toolButton
        [web.Element/class]
            btn
            btn-link
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/requestingPartner}
            .{&}
                @record
                .{ActivityComponent/activity}
                .{Activity/thread}
                .{Thread/model}
                .{=}
                    slide.channel
        [Element/onClick]
            @env
            .{Env/owlEnv}
            .{Dict/get}
                services
            .{Dict/get}
                rpc
            .{Function/call}
                [model]
                    slide.channel
                [method]
                    action_grant_access
                [args]
                    {Record/insert}
                        [Record/traits]
                            Collection
                        {Record/insert}
                            [Record/traits]
                                Collection
                            @record
                            .{ActivityComponent/activity}
                            .{Activity/thread}
                            .{Thread/id}
                [kwargs]
                    [partner_id]
                        @record
                        .{ActivityComponent/activity}
                        .{Activity/requestingPartner}
                        .{Partner/id}
            {Component/trigger}
                @record
                reload
`;
