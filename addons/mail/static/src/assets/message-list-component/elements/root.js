/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            MessageListComponent
        [Element/onScroll]
            {MessageListComponent/_onScrollThrottled}
                @record
                @ev
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex-flow]
                column
            [web.scss/overflow]
                auto
            {if}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/messages}
                .{Collection/length}
                .{=}
                    0
            .{then}
                [web.scss/align-items]
                    center
                [web.scss/justify-content]
                    center
            {if}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/messages}
                .{Collection/length}
                .{>}
                    0
            .{then}
                [web.scss/padding-bottom]
                    {scss/map-get}
                        {scss/$spacers}
                        4
            [web.scss/background-color]
                {scss/$white}
`;
