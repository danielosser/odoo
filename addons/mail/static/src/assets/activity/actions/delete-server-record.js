/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Delete the record from database and locally.
    {Action}
        [Action/name]
            Activity/deleteServerRecord
        [Action/params]
            activity
        [Action/behavior]
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
                        [model]
                            mail.activity
                        [method]
                            unlink
                        [args]
                            {Record/insert}
                                [Record/traits]
                                    Collection
                                {Record/insert}
                                    [Record/traits]
                                        Collection
                                    @activity
                                    .{Activity/id}
            {Record/delete}
                @activity
`;
