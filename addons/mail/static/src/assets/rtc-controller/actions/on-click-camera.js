/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            RtcController/onClickCamera
        [Action/params]
            ev
                [type]
                    MouseEvent
            record
                [type]
                    RtcController
        [Action/behavior]
            {Rtc/toggleUserVideo}
`;
