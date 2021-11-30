/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        toggles screen broadcasting to peers.
    {Action}
        [Action/name]
            Rtc/toggleScreenShare
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
                        display
`;
