/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            channel - counter: should not have a counter if the category is unfolded and without needaction messages
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
                    mail.channel
                [mail.channel/id]
                    20
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            @testEnv
            .{Record/insert}
                [Record/traits]
                    DiscussComponent
            @testEnv
            .{Discuss/open}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/categoryChannel}
                    .{DiscussSidebarCategory/counter}
                    .{isFalsy}
                [2]
                    should not have a counter if the category is unfolded and without unread messages
`;