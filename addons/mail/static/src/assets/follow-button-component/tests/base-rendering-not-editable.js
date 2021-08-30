/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            base rendering not editable
        [Test/model]
            FollowButtonComponent
        [Test/assertions]
            3
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
            :thread
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        Thread
                    [Thread/id]
                        100
                    [Thread/model]
                        res.partner
            @testEnv
            .{Record/insert}
                [Record/traits]
                    FollowButtonComponent
                [FollowButtonComponent/isDisabled]
                    true
                [FollowButtonComponent/thread]
                    @thread
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have follow button component
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/first}
                    .{FollowButtonComponent/follow}
                [2]
                    should have 'Follow' button
            {Test/assert}
                [0]
                    @record
                [1]
                    @thread
                    .{Thread/followButtonComponents}
                    .{Collection/first}
                    .{FollowButtonComponent/follow}
                    .{web.Element/isDisabled}
                [2]
                    'Follow' button should be disabled
`;
