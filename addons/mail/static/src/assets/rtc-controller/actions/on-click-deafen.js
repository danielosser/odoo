/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            RtcController/onClickDeafen
        [Action/params]
            ev
                [type]
                    MouseEvent
            record
                [type]
                    RtcController
        [Action/behavior]
            {Rtc/toggleMicrophone}
`;
