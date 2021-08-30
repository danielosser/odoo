/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            micButtonIcon
        [Element/model]
            RtcControllerComponent
        [Model/traits]
            RtcControllerComponent/buttonIcon
        [web.Element/class]
            {if}
                {Rtc/currentRtcSession}
                .{RtcSession/isMuted}
            .{then}
                fa-microphone-slash
            .{else}
                fa-microphone
`;
