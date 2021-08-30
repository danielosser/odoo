/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            show empty placeholder when thread contains no message
        [Test/model]
            ThreadViewComponent
        [Test/assertions]
            2
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
                    11
            @testEnv
            .{Record/insert}
                [Record/traits]
                    Server
                [Server/data]
                    @record
                    .{Test/data}
            :threadViewer
                @testEnv
                .{Record/insert}
                    [Record/traits]
                        ThreadViewer
                    [ThreadViewer/hasThreadView]
                        true
                    [ThreadViewer/thread]
                        @testEnv
                        .{Record/insert}
                            [Record/traits]
                                Thread
                            [Thread/id]
                                11
                            [Thread/model]
                                mail.channel
            @testEnv
            .{UI/afterEvent}
                [eventName]
                    o-thread-view-hint-processed
                [func]
                    @testEnv
                    .{Record/insert}
                        [Record/traits]
                            ThreadViewComponent
                        [ThreadViewComponent/threadView]
                            @threadViewer
                            .{ThreadViewer/threadView}
                [message]
                    should wait until thread becomes loaded with messages
                [predicate]
                    {func}
                        [in]
                            hint
                            threadViewer
                        [out]
                            @hint
                            .{Hint/type}
                            .{=}
                                messages-loaded
                            .{&}
                                @threadViewer
                                .{ThreadViewer/thread}
                                .{Thread/model}
                                .{=}
                                    mail.channel
                            .{&}
                                @threadViewer
                                .{ThreadViewer/thread}
                                .{Thread/id}
                                .{=}
                                    11
            {Test/assert}
                [0]
                    @record
                [1]
                    @threadViewer
                    .{ThreadViewer/threadView}
                    .{ThreadView/messageListComponents}
                    .{Collection/first}
                    .{MessageListComponent/empty}
                [2]
                    message list empty placeholder should be shown as thread does not contain any messages
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
                        0
                [2]
                    no message should be shown as thread does not contain any
`;
