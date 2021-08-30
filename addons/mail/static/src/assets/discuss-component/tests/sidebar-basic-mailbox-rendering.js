/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Test}
        [Test/name]
            sidebar: basic mailbox rendering
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
                    .{Env/inbox}
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/threadIcon}
                [2]
                    mailbox should have an icon
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Env/inbox}
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/threadIcon}
                    .{ThreadIconComponent/mailboxInbox}
                [2]
                    inbox should have 'inbox' icon
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Env/inbox}
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/name}
                [2]
                    mailbox should have a name
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Env/inbox}
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/name}
                    .{web.Element/textContent}
                    .{=}
                        Inbox
                [2]
                    inbox should have name 'Inbox'
            {Test/assert}
                [0]
                    @record
                [1]
                    @testEnv
                    .{Env/inbox}
                    .{Thread/discussSidebarCategoryItemComponents}
                    .{Collection/first}
                    .{DiscussSidebarCategoryItemComponent/counter}
                    .{isFalsy}
                [2]
                    should have no counter when equal to 0 (default value)
`;
