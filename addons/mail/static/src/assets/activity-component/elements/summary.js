/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            summary
        [Element/model]
            ActivityComponent
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/summary}
        [web.Element/textContent]
            {String/sprintf}
                [0]
                    {Locale/text}
                        “%s”
                [1]
                    @record
                    .{ActivityComponent/activity}
                    .{Activity/summary}
        [web.Element/style]
            [web.scss/margin-inline-end]
                {scss/map-get}
                    {scss/$spacers}
                    2
            [web.scss/font-weight]
                bolder
            [web.scss/color]
                {scss/gray}
                    900
`;
