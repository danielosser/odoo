/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            RtcController/onClickScreen
        [Action/params]
            ev
                [type]
                    MouseEvent
            record
                [type]
                    RtcController
        [Action/behavior]
            {Rtc/toggleScreenShare}
`;
