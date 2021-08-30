/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            basic top bar rendering
        [Test/model]
            DiscussComponent
        [Test/assertions]
            8
        [Test/scenario]
            {Dev/comment}
                channel expected to be found in the sidebar
                with a random unique id and name that will be referenced in the test
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
                [mail.channel/name]
                    General
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
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/threadViewTopbar}
                    .{ThreadViewTopbar/threadViewTopbarComponents}
                    .{Collection/first}
                    .{ThreadViewTopbarComponent/thread}
                    .{web.Element/textContent}
                    .{=}
                        Inbox
                [2]
                    display inbox in the top bar
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/threadViewTopbar}
                    .{ThreadViewTopbar/threadViewTopbarComponents}
                    .{Collection/first}
                    .{ThreadViewTopbarComponent/markAllReadButton}
                [2]
                    should have visible button 'Mark all read' in the top bar of inbox
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/threadViewTopbar}
                    .{ThreadViewTopbar/threadViewTopbarComponents}
                    .{Collection/first}
                    .{ThreadViewTopbarComponent/markAllReadButton}
                    .{web.Element/isDisabled}
                [2]
                    should have disabled button 'Mark all read' in the topbar of inbox (no messages)

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Env/starred}
                        .{Thread/discussSidebarCategoryItemComponents}
                        .{Collection/first}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/threadViewTopbar}
                    .{ThreadViewTopbar/threadViewTopbarComponents}
                    .{Collection/first}
                    .{ThreadViewTopbarComponent/threadName}
                    .{web.Element/textContent}
                    .{=}
                        Starred
                [2]
                    display starred in the top bar
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/threadViewTopbar}
                    .{ThreadViewTopbar/threadViewTopbarComponents}
                    .{Collection/first}
                    .{ThreadViewTopbarComponent/unstarAllButton}
                [2]
                    should have visible button 'Unstar all' in the top bar of starred
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/threadViewTopbar}
                    .{ThreadViewTopbar/threadViewTopbarComponents}
                    .{Collection/first}
                    .{ThreadViewTopbarComponent/unstarAllButton}
                    .{web.Element/isDisabled}
                [2]
                    should have disabled button 'Unstar all' in the top bar of starred (no messages)

            @testEnv
            .{Component/afterNextRender}
                {func}
                    @testEnv
                    .{UI/click}
                        @testEnv
                        .{Record/findById}
                            [Thread/id]
                                20
                            [Thread/model]
                                mail.channel
                        .{Thread/discussSidebarCategoryItemComponent}
                        .{Collection/first}
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/threadViewTopbar}
                    .{ThreadViewTopbar/threadViewTopbarComponents}
                    .{Collection/first}
                    .{web.Element/textContent}
                    .{=}
                        #General
                [2]
                    display general in the breadcrumb
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Discuss/thread}
                    .{Thread/threadViews}
                    .{Collection/first}
                    .{ThreadView/threadViewTopbar}
                    .{ThreadViewTopbar/threadViewTopbarComponents}
                    .{Collection/first}
                    .{ThreadViewTopbarComponent/inviteButton}
                [2]
                    should have button 'Invite' in the top bar of channel
`;
