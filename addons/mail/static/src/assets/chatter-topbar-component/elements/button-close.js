/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            buttonClose
        [Element/model]
            ChatterTopbarComponent
        [Model/traits]
            Hoverable
        [Element/isPresent]
            @record
            .{ChatterTopbarComponent/chatter}
            .{Chatter/hasTopbarCloseButton}
        [web.Element/title]
            {Locale/text}
                Close
        [Element/onClick]
            {ChatterTopbarComponent/trigger}
                @record
                o-close-chatter
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/flex-shrink]
                0
            [web.scss/justify-content]
                center
            [web.scss/align-items]
                center
            [web.scss/width]
                34
                px
            [web.scss/height]
                34
                px
            [web.scss/border-radius]
                0
                0
                10px
                10px
            [web.scss/font-size]
                {scss/$font-size-lg}
            [web.scss/background-color]
                {scss/gray}
                    700
            [web.scss/color]
                {scss/gray}
                    100
            [web.scss/cursor]
                pointer
            {if}
                @field
                .{web.Element/isHover}
            .{then}
                [web.scss/background-color]
                    {scss/gray}
                        600
                [web.scss/color]
                    {scss/$white}
`;
