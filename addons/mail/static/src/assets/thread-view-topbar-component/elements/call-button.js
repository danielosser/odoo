/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            callButton
        [Element/model]
            ThreadViewTopbarComponent
        [Element/isPresent]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/thread}
            .{&}
                @record
                .{ThreadViewTopbarComponent/threadViewTopbar}
                .{ThreadViewTopbar/thread}
                .{Thread/model}
                .{=}
                    mail.channel
            .{&}
                @record
                .{ThreadViewTopbarComponent/threadViewTopbar}
                .{ThreadViewTopbar/thread}
                .{Thread/rtcSessions}
                .{Collection/length}
                .{=}
                    0
        [Model/traits]
            ThreadViewTopbarComponent/button
        [web.Element/isActive]
            true
        [web.Element/isDisabled]
            @record
            .{ThreadViewTopbarComponent/threadViewTopbar}
            .{ThreadViewTopbar/thread}
            .{Thread/hasPendingRtcRequest}
        [web.scss/Element/title]
            {Locale/text}
               Start a Call
        [Element/onClick]
            {if}
                @record
                .{ThreadViewTopbarComponent/threadViewTopBar}
                .{ThreadViewTopbar/thread}
                .{Thread/hasPendingRtcRequest}
            .{then}
                {break}
            {Thread/toggleCall}
                @record
                .{ThreadViewTopbarComponent/threadViewTopbar}
                .{ThreadViewTopbar/thread}
`;
