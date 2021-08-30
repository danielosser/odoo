/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            restore thread scroll position
        [Test/model]
            DiscussComponent
        [Test/assertions]
            6
        [Test/scenario]
            {Dev/comment}
                channels expected to be rendered, with random unique id that
                will be referenced in the test
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                [0]
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        11
                [1]
                    [Record/traits]
                        mail.channel
                    [mail.channel/id]
                        12
                {foreach}
                    {Record/insert}
                        [Record/traits]
                            Range
                        [start]
                            0
                        [end]
                            25
                .{as}
                    i
                .{do}
                    {entry}
                        [Record/traits]
                            mail.message
                        [mail.message/body]
                            not empty
                        [mail.message/model]
                            mail.channel
                        [mail.message/res_id]
                            11
                {foreach}
                    {Record/insert}
                        [Record/traits]
                            Range
                        [start]
                            0
                        [end]
                            25
                .{as}
                    i
                .{do}
                    {entry}
                        [Record/traits]
                            mail.message
                        [mail.message/body]
                            not empty
                        [mail.message/model]
                            mail.channel
                        [mail.message/res_id]
                            12
            @testEnv
            .{UI/waitUntilEvent}
                [eventName]
                    o-component-message-list-scrolled
                [message]
                    should wait until channel 11 scrolled to its last message
                [predicate]
                    {func}
                        [in]
                            thread
                        [out]
                            @thread
                            .{Thread/model}
                            .{=}
                                mail.channel
                            .{&}
                                @thread
                                .{Thread/id}
                                .{=}
                                    11
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
                        11
                    [Thread/model]
                        mail.channel
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
                        25
                [2]
                    should have 25 messages in channel 11
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/messageListComponents}
                    .{Collection/first}
                    .{web.Element/scrollTop}
                    .{=}
                        @testEnv
                        .{Discuss/thread}
                        .{Thread/threadViews}
                        .{Collection/first}
                        .{ThreadView/messageListComponents}
                        .{Collection/first}
                        .{web.Element/scrollHeight}
                        .{-}
                            @testEnv
                            .{Discuss/thread}
                            .{Thread/threadViews}
                            .{Collection/first}
                            .{ThreadView/messageListComponents}
                            .{Collection/first}
                            .{web.Element/clientHeight}
                [2]
                    should have scrolled to bottom of channel 11 initially

            @testEnv
            .{UI/afterNextRender}
                {func}
                    @testEnv
                    .{UI/afterEvent}
                        [eventName]
                            o-component-message-list-scrolled
                        [func]
                            @testEnv
                            .{Record/update}
                                [0]
                                    @testEnv
                                    .{Discuss/thread}
                                    .{Thread/threadViews}
                                    .{Collection/first}
                                    .{ThreadView/messageListComponents}
                                    .{Collection/first}
                                [1]
                                    [web.Element/scrollTop]
                                        0
                        [message]
                            should wait until channel 11 changed its scroll position to top
                        [predicate]
                            {func}
                                [in]
                                    thread
                                [out]
                                    @thread
                                    .{Thread/model}
                                    .{=}
                                        mail.channel
                                    .{&}
                                        @thread
                                        .{Thread/id}
                                        .{=}
                                            11
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/messageListComponents}
                    .{web.Element/scrollTop}
                    .{=}
                        0
                [2]
                    should have scrolled to top of channel 11

            {Dev/comment}
                Ensure scrollIntoView of channel 12 has enough time to complete before
                going back to channel 11. Await is needed to prevent the scrollIntoView
                initially planned for channel 12 to actually apply on channel 11.
                task-2333535
            @testEnv
            .{UI/afterEvent}
                [eventName]
                    o-component-message-list-scrolled
                {Dev/comment}
                    select channel 12
                [func]
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                12
                            [Thread/model]
                                mail.channel
                        .{Thread/discussSidebarCategoryItemComponents}
                        .{Collection/first}
                [message]
                    should wait until channel 12 scrolled to its last message
                [predicate]
                    {func}
                        [in]
                            scrollTop
                            thread
                        [out]
                            @thread
                            .{Thread/model}
                            .{=}
                                mail.channel
                            .{&}
                                @thread
                                .{Thread/id}
                                .{=}
                                    12
                            .{&}
                                @scrollTop
                                .{=}
                                    @thread
                                    .{Thread/threadViews}
                                    .{Collection/first}
                                    .{ThreadView/messageListComponents}
                                    .{Collection/first}
                                    .{web.Element/scrollHeight}
                                    .{-}
                                        @thread
                                        .{Thread/threadViews}
                                        .{Collection/first}
                                        .{ThreadView/messageListComponents}
                                        .{Collection/first}
                                        .{web.Element/clientHeight}
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
                        24
                [2]
                    should have 24 messages in channel 12

            @testEnv
            .{UI/afterEvent}
                [eventName]
                    o-component-message-list-scrolled
                {Dev/comment}
                    select channel 11
                [func]
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                11
                            [Thread/model]
                                mail.channel
                        .{Thread/discussSidebarCategoryItemComponents}
                        .{Collection/first}
                [message]
                    should wait until channel 12 recovered its scroll position (to bottom)
                [predicate]
                    {func}
                        [in]
                            scrollTop
                            thread
                        [out]
                            @thread
                            .{Thread/model}
                            .{=}
                                mail.channel
                            .{&}
                                @thread
                                .{Thread/id}
                                .{=}
                                    11
                            .{&}
                                @scrollTop
                                .{=}
                                    0
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/messageListComponents}
                    .{Collection/first}
                    .{web.Element/scrollTop}
                    .{=}
                        0
                [2]
                    should have recovered scroll position of channel 11 (scroll to top)

            @testEnv
            .{UI/afterEvent}
                [eventName]
                    o-component-message-list-scrolled
                {Dev/comment}
                    select channel 12
                [func]
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                12
                            [Thread/model]
                                mail.channel
                        .{Thread/discussSidebarCategoryItemComponents}
                        .{Collection/first}
                [message]
                    should wait until channel 12 recovered its scroll position
                [predicate]
                    {func}
                        [in]
                            scrollTop
                            thread
                        [out]
                            @thread
                            .{Thread/model}
                            .{=}
                                mail.channel
                            .{&}
                                @thread
                                .{Thread/id}
                                .{=}
                                    12
                            .{&}
                                @scrollTop
                                .{=}
                                    @thread
                                    .{Thread/threadViews}
                                    .{Collection/first}
                                    .{ThreadView/messageListComponents}
                                    .{Collection/first}
                                    .{web.Element/scrollHeight}
                                    .{-}
                                        @thread
                                        .{Thread/threadViews}
                                        .{Collection/first}
                                        .{ThreadView/messageListComponents}
                                        .{Collection/first}
                                        .{web.Element/clientHeight}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/messageListComponents}
                    .{Collection/first}
                    .{web.Element/scrollTop}
                    .{=}
                        @testEnv
                        .{Discuss/thread}
                        .{Thread/threadViews}
                        .{Collection/first}
                        .{ThreadView/messageListComponents}
                        .{Collection/first}
                        .{web.Element/scrollHeight}
                        .{-}
                            @testEnv
                            .{Discuss/thread}
                            .{Thread/threadViews}
                            .{Collection/first}
                            .{ThreadView/messageListComponents}
                            .{Collection/first}
                            .{web.Element/clientHeight}
                [2]
                    should have recovered scroll position of channel 12 (scroll to bottom)
`;
