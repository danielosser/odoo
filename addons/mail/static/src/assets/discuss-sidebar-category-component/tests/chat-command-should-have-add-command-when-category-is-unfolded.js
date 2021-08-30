/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            chat - command: should have add command when category is unfolded
        [Test/model]
            DiscussSidebarCategoryComponent
        [Test/assertions]
            1
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
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/categoryChat}
                    .{DiscussSidebarCategory/hasAddCommand}
                [1]
                    should have add command when chat category is open
`;
