/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            button
        [Element/model]
            RtcActivityNoticeComponent
        [Element/isPresent]
            {Rtc/channel}
        [web.Element/tag]
            a
        [web.Element/role]
            button
        [web.Element/title]
            {String/sprintf}
                [0]
                    {Locale/text}
                        Open conference: %s
                [1]
                    {Rtc/channel}
                    .{Thread/displayName}
        [Element/onClick]
            {RtcActivityNoticeComponent/onClick}
                [0]
                    @record
                [1]
                    @ev
        [web.Element/style]
            [web.scss/font-weight]
                bold
            [web.scss/user-select]
                none
`;
