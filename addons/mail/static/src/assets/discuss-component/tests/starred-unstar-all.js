/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            starred: unstar all
        [Test/model]
            DiscussComponent
        [Test/assertions]
            6
        [Test/scenario]
            :testEnv
                {Record/insert}
                    [Record/traits]
                        Env
            @testEnv
            .{Record/insert}
                {Dev/comment}
                    messages expected to be starred
                [0]
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        not empty
                    [mail.message/starred_partner_ids]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
                [1]
                    [Record/traits]
                        mail.message
                    [mail.message/body]
                        not empty
                    [mail.message/starred_partner_ids]
                        @record
                        .{Test/data}
                        .{Data/currentPartnerId}
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
                        starred
                    [Thread/model]
                        mail.box
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Env/starred}
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/counter}
                    .{web.Element/textContent}
                    .{=}
                        2
                [2]
                    starred should have counter of 2
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
                        2
                [2]
                    should have 2 messages in starred
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            ThreadViewTopbarComponent
                    .{Collection/first}
                    .{ThreadViewTopbarComponent/unstarAllButton}
                    .{web.Element/isDisabled}
                    .{isFalsy}
                [2]
                    should have enabled button 'Unstar all' in the top bar of starred (has messages)

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/all}
                            [Record/traits]
                                ThreadViewTopbarComponent
                        .{Collection/first}
                        .{ThreadViewTopbarComponent/unstarAllButton}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Env/starred}
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/counter}
                    .{isFalsy}
                [2]
                    starred should display no counter (= 0)
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
                        0
                [2]
                    should have no message in starred
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Record/all}
                        [Record/traits]
                            ThreadViewTopbarComponent
                    .{Collection/first}
                    .{ThreadViewTopbarComponent/unstarAllButton}
                    .{web.Element/isDisabled}
                [2]
                    should have disabled button 'Unstar all' in the top bar of starred (no messages)
`;
