/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            show message subject when subject is not the same as the thread name
        [Test/model]
            ThreadViewComponent
        [Test/assertions]
            3
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                []
                    [Record/traits]
                        mail.channel
                    [mail.channel/channel_type]
                        channel
                    [mail.channel/id]
                        100
                    [mail.channel/name]
                        General
                    [mail.channel/public]
                        public
                []
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        not empty
                    [mail.message/model]
                        mail.channel
                    [mail.message/res_id]
                        100
                    [mail.message/subject]
                        Salutations, voyageur
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :thread
                @testEnv
                .{Record/findById}
                    [Thread/id]
                        100
                    [Thread/model]
                        mail.channel
            :threadViewer
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        ThreadViewer
                    [ThreadViewer/hasThreadView]
                        true
                    [ThreadViewer/thread]
                        @thread
            @testEnv
            .{Record/insert}
                [Record/traits]
                    ThreadViewComponent
                [ThreadViewComponent/threadView]
                    @threadViewer
                    .{ThreadViewer/threadView}
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/length}
                    .{=}
                        1
                [2]
                    should display a single message
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/subject}
                [2]
                    should display subject of the message
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/thread}
                    .{Thread/cache}
                    .{ThreadCache/messages}
                    .{Collection/first}
                    .{Message/messageComponents}
                    .{Collection/first}
                    .{MessageViewComponent/subject}
                    .{web.Element/textContent}
                    .{=}
                        Subject: Salutations, voyageur
                [2]
                    Subject of the message should be 'Salutations, voyageur'
`;
