/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            tabButton
        [Element/model]
            MessagingMenuComponent
        [web.Element/tag]
            button
        [Model/traits]
            Hoverable
        [web.Element/class]
            btn
            btn-link
            {if}
                {MessagingMenu/activeTabId}
                .{=}
                    @template
                    .{Template/tabId}
            .{then}
                o-isActive
        [Element/isPresent]
            {Device/isMobile}
            .{isFalsy}
        [Element/t-foreach]
            all
            chat
            channel
        [Element/t-as]
            tabId
        [Element/t-key]
            @template
            .{Template/tabId}
        [Element/onClick]
            {Record/update}
                [0]
                    @record
                    .{MessagingMenuComponent/messagingMenu}
                [1]
                    [MessagingMenu/activeTabId]
                        @ev
                        .{web.MouseEvent/currentTarget}
                        .{web.Element/dataset}
                        .{web.Dataset/tabId}
        [web.Element/type]
            button
        [web.Element/role]
            tab
        [web.Element/data-tab-id]
            @template
            .{Template/tabId}
        [web.Element/textContent]
            {if}
                @template
                .{Template/tabId}
                .{=}
                    all
            .{then}
                {Locale/text}
                    All
            .{elif}
                @template
                .{Template/tabId}
                .{=}
                    chat
            .{then}
                {Locale/text}
                    Chat
            .{elif}
                @template
                .{Template/tabId}
                .{=}
                    channel
            .{then}
                {Locale/text}
                    Channels
        [web.Element/style]
            {web.scss/selector}
                [0]
                    &.o-isActive
                [1]
                    [web.scss/font-weight]
                        bold
            {if}
                @field
                .{web.Element/isHover}
                .{isFalsy}
            .{then}
                {web.scss/selector}
                    [0]
                        &:not(.o-isActive)
                    [1]
                        [web.scss/color]
                            {scss/gray}
                                500
`;
