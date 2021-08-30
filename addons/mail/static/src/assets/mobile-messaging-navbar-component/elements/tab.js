/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            tab
        [Element/model]
            MobileMessagingNavbarComponent
        [Element/t-foreach]
            @record
            .{MobileMessagingNavbarComponent/tabs}
        [Element/t-as]
            tab
        [Element/t-key]
            @template
            .{Template/tab}
            .{TODO/id}
        [web.Element/class]
            {if}
                @record
                .{MobileMessagingNavbarComponent/activeTabId}
                .{=}
                    @template
                    .{Template/tab}
                    .{TODO/id}
            .{then}
                o-isActive
        [Element/onClick]
            {if}
                @record
                .{MobileMessagingNavbarComponent/discussComponent}
            .{then}
                {web.Event/stopPropagation}
                    @ev
                {if}
                    {Discuss/activeMobileNavbarTabId}
                    .{=}
                        @ev
                        .{web.Event/detail}
                        .{web.Detail/tabId}
                .{then}
                    {break}
                {Record/update}
                    [0]
                        @record
                        .{MobileMessagingNavbarComponent/discussComponent}
                        .{DiscussComponent/discuss}
                    [1]
                        [Discuss/activeMobileNavbarTabId]
                            @ev
                            .{web.Event/detail}
                            .{web.Detail/tabId}
                {if}
                    .{Discuss/activeMobileNavbarTabId}
                    .{=}
                        mailbox
                    .{&}
                        {Discuss/thread}
                        .{Thread/model}
                        .{!=}
                            mailbox
                .{then}
                    {Record/update}
                        [0]
                            @record
                            .{MobileMessagingNavbarComponent/discussComponent}
                            .{DiscussComponent/discuss}
                        [1]
                            [Discuss/thread]
                                {Env/inbox}
                {if}
                    {Discuss/activeMobileNavbarTabId}
                    .{!=}
                        mailbox
                .{then}
                    {Record/update}
                        [0]
                            @record
                            .{MobileMessagingNavbarComponent/discussComponent}
                            .{DiscussComponent/discuss}
                        [1]
                            [Discuss/thread]
                                {Record/empty}
                {if}
                    {Discuss/activeMobileNavbarTabId}
                    .{!=}
                        chat
                .{then}
                    {Record/update}
                        [0]
                            @record
                            .{MobileMessagingNavbarComponent/discussComponent}
                            .{DiscussComponent/discuss}
                        [1]
                            [Discuss/isAddingChat]
                                false
                {if}
                    {Discuss/activeMobileNavbarTabId}
                    .{!=}
                        channel
                .{then}
                    {Record/update}
                        [0]
                            @record
                            .{MobileMessagingNavbarComponent/discussComponent}
                            .{DiscussComponent/discuss}
                        [1]
                            [Discuss/isAddingChannel]
                                false
            {if}
                @record
                .{MobileMessagingNavbarComponent/messagingMenuComponent}
            .{then}
                {web.Event/stopPropagation}
                    @ev
                {Record/update}
                    [0]
                        @record
                        .{MobileMessagingNavbarComponent/messagingMenuComponent}
                        .{MessagingMenuComponent/messagingMenu}
                    [1]
                        [MessagingMenu/activeTabId]
                            @ev
                            .{web.Event/detail}
                            .{web.Detail/tabId}
        [web.Element/data-tab-id]
            @template
            .{Template/tab}
            .{Tab/id}
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex-flow]
                column
            [web.scss/align-items]
                center
            [web.scss/flex]
                1
                1
                0
            [web.scss/padding]
                {scss/map-get}
                    {scss/$spacers}
                    2
            [web.scss/box-shadow]
                1px
                0
                0
                {scss/gray}
                    400
            {if}
                @record
                .{MobileMessagingNavbarComponent/activeTabId}
                .{=}
                    @template
                    .{Template/tab}
                    .{Tab/id}
            .{then}
                [web.scss/color]
                    {scss/$o-brand-primary}
`;
