/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            redirect to author opens chat
        [Test/model]
            DiscussComponent
        [Test/assertions]
            5
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    {Dev/comment}
                        channel expected to be found in the sidebar
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        1
                        {Dev/comment}
                            random unique id, will be referenced in the test
                    [mail.channel/name]
                        General
                        {Dev/comment}
                            random name, will be asserted in the test
                [1]
                    {Dev/comment}
                        chat expected to be found in the sidebar
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        chat
                        {Dev/comment}
                            testing a chat is the goal of the test
                    [mail.channel/id]
                        10
                        {Dev/comment}
                            random unique id, will be referenced in the test
                    [mail.channel/members]
                        {Dev/comment}
                            expected partners
                        [0]
                            @record
                            .{Test/data}
                            .{Data/currentPartnerId}
                        [1]
                            7
                    [mail.channel/public]
                        private
                        {Dev/comment}
                            expected value for testing a chat
                [2]
                    [Record/traits]
                        mail.message
                    [mail.message/author_id]
                        7
                    [mail.message/body]
                        not empty
                    [mail.message/id]
                        100
                    [mail.message/model]
                        mail.channel
                    [mail.message/res_id]
                        1
                [3]
                    {Dev/comment}
                        expected correspondent, with a random unique id
                        that will be used to link partner to chat and
                        a random name that will be asserted in the test
                    [Record/traits]
                        res.partner
                    [res.partner/id]
                        7
                    [res.partner/name]
                        Demo
                [4]
                    [Record/traits]
                        res.users
                    [res.users/partner_id]
                        7
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
            .{Thread/open}
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        1
                    [Thread/model]
                        mail.channel
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{=}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                1
                            [Thread/model]
                                mail.channel
                [2]
                    channel 'General' should be active
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should have 1 message
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Message/id]
                            100
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/authorAvatar}
                [2]
                    message1 should have author image
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/findById}
                        [Message/id]
                            100
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/authorAvatar}
                    .{web.Element/class}
                    .{String/includes}
                        o_redirect
                [2]
                    message1 should have redirect to author

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/findById}
                            [Message/id]
                                100
                        .{Message/messageComponents}
                        .{Collection/first}
                        .{MessageViewComponent/authorAvatar}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{=}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                10
                            [Thread/model]
                                mail.channel
                [2]
                    chat 'Demo' should become active after author redirection
`;
