/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Performs the 'search_read' RPC on 'hr.employee.public'.
    {Action}
        [Action/name]
            Employee/performRpcSearchRead
        [Action/params]
            [context]
                [type]
                    Object
            [domain]
                [type]
                    Array[]
            [fields]
                [type]
                    string[]
        [Action/behavior]
            :dataList
                @env
                .{Env/owlEnv}
                .{Dict/get}
                    services
                .{Dict/get}
                    rpc
                .{Function/call}
                    [model]
                        hr.employee.public
                    [method]
                        search_read
                    [kwargs]
                        [context]
                            @context
                        [domain]
                            @domain
                        [fields]
                            @fields
            {Record/insert}
                [Record/traits]
                    Employee
                @dataList
                .{Collection/map}
                    {func}
                        [in]
                            item
                        [out]
                            {Employee/convertData}
                                @item
`;
