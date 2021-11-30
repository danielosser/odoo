/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Toggles user video (eg: webcam) broadcasting to peers.
    {Action}
        [Action/name]
            Rtc/toggleUserVideo
        [Action/params]
            record
                [type]
                    Rtc
        [Action/behavior]
            {Rtc/_toggleVideoBroadcast}
                [0]
                    @record
                [1]
                    [type]
                        user-video
`;
