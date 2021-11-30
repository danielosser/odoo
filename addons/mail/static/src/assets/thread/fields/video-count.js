/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The amount of videos broadcast in the current Rtc call
    {Field}
        [Field/name]
            videoCount
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/target]
            Integer
        [Field/default]
            0
        [Field/compute]
            @record
            .{Thread/rtcSessions}
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{RtcSession/videoStream}
            .{Collection/length}
`;
