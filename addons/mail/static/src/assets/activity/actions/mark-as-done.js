/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Activity/markAsDone
        [Action/params]
            activity
        [Action/behavior]
            :data
                {Record/doAsync}
                    @activity
                    {func}
                        @env
                        .{Env/owlEnv}
                        .{Dict/get}
                            services
                        .{Dict/get}
                            rpc
                        .{Function/call}
                            [0]
                                [model]
                                    mail.activity
                                [method]
                                    activity_format
                                [args]
                                    {Record/insert}
                                        [Record/traits]
                                            Collection
                                        @activity
                                        .{Activity/id}
                            [1]
                                [shadow]
                                    true
            :shouldDelete
                false
            {if}
                data
                .{Collection/first}
            .{then}
                {Record/update}
                    [0]
                        @activity
                    [1]
                        {Activity/convertData}
                            @data
                            .{Collection/first}
            .{else}
                :shouldDelete
                    true
            {Thread/refreshActivities}
                @activity
                .{Activity/thread}
            {Thread/refresh}
                @activity
                .{Activity/thread}
            {if}
                @shouldDelete
            .{then}
                {Record/delete}
                    @activity
`;
