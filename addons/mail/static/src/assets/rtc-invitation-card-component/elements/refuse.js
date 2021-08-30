/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            refuse
        [Element/model]
            RtcInvitationCardComponent
        [Model/traits]
            RtcInvitationCardComponent/button
        [web.Element/aria-label]
            {Locale/text}
                Refuse
        [web.Element/title]
            {Locale/text}
                Refuse
        [Element/onClick]
            {if}
                @record
                .{RtcInvitationCardComponent/thread}
                .{Thread/hasPendingRtcRequest}
            .{then}
                {break}
            {Thread/leaveCall}
                @record
                .{RtcInvitationCardComponent/thread}
        [web.Element/style]
            [web.scss/background-color]
                {scss/theme-color}
                    danger
            {if}
                @field
                .{web.Element/isHover}
            .{then}
                [web.scss/background-color]
                    {scss/darken}
                        {scss/theme-color}
                            danger
                        10%
`;
