/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            separatorNewMessages
        [Element/model]
            MessageListComponent
        [Model/traits]
            MessageListComponent/item
            MessageListComponent/separator
        [Element/isPresent]
            @template
            .{Template/messageView}
            .{MessageView/message}
            .{=}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/thread}
                .{Thread/messageAfterNewMessageSeparator}
        [Element/t-transition]
            fade
        [web.Element/style]
            {Dev/comment}
                bug with safari: container does not auto-grow from child size
            [web.scss/padding]
                [0]
                    {scss/map-get}
                        {scss/$spacers}
                        0
                [1]
                    {scss/map-get}
                        {scss/$spacers}
                        0
            [web.scss/margin-right]
                {scss/map-get}
                    {scss/$spacers}
                    4
            [web.scss/color]
                {scss/lighten}
                    {scss/$o-brand-odoo}
                    15%
            {if}
                {Env/hasAnimation}
            .{then}
                {web.scss/selector}
                    [0]
                        &.fade-leave-active
                    [1]
                        [web.scss/transition]
                            opacity
                            0.5s
                {web.scss/selector}
                    [0]
                        &.fade-leave-to
                    [1]
                        [web.scss/opacity]
                            0
`;
