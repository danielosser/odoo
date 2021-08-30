/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            title
        [Element/model]
            ActivityBoxComponent
        [web.Element/tag]
            a
        [web.Element/role]
            button
        [Element/isPresent]
            @record
            .{ActivityBoxComponent/activityBoxView}
            .{ActivityBoxView/chatter}
            .{Chatter/thread}
        [Element/onClick]
            {Record/update}
                [0]
                    @record
                    .{ActivityBoxComponent/activityBoxView}
                [1]
                    [ActivityBoxView/isActivityListVisible]
                        @record
                        .{ActivityBoxComponent/hactivityBoxView}
                        .{ActivityBoxView/isActivityListVisible}
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/align-items]
                center
            [web.scss/flex]
                0
                0
                auto
            [web.scss/margin-top]
                {scss/map-get}
                    {scss/$spacers}
                    4
            [web.scss/margin-bottom]
                {scss/map-get}
                    {scss/$spacers}
                    4
            [web.scss/font-weight]
                bold
`;
