/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the Rtc call viewer of this thread.
    {Field}
        [Field/name]
            rtcCallViewer
        [Field/model]
            ThreadView
        [Field/type]
            o2o
        [Field/target]
            RtcCallViewer
        [Field/inverse]
            RtcCallViewer/threadView
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/compute]
            {if}
                @record
                .{RtcCallViewer/thread}
                .{&}
                    @record
                    .{RtcCallViewer/thread}
                    .{Thread/model}
                    .{=}
                        mail.channel
                .{&}
                    @record
                    .{RtcCallViewer/thread}
                    .{Thread/rtcSessions}
                    .{Collection/length}
                    .{>}
                        0
            .{then}
                {Record/insert}
                    [Record/traits]
                        RtcCallViewer
            .{else}
                {Record/empty}
`;
