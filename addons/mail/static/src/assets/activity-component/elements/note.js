/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            note
        [Element/model]
            ActivityComponent
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/note}
        [web.Element/htmlContent]
            @record
            .{ActivityComponent/activity}
            .{Activity/note}
        [web.Element/style]
            {scss/selector}
                [0]
                    p
                [1]
                    [web.scss/margin-bottom]
                        {scss/map-get}
                            {scss/$spacers}
                            0
`;
