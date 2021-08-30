/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            headphoneButtonIcon
        [Element/model]
            RtcControllerComponent
        [Model/traits]
            RtcControllerComponent/buttonIcon
        [web.Element/class]
            {if}
                {Rtc/currentRtcSession}
                .{RtcSession/isDeaf}
            .{then}
                fa-microphone-deaf
            .{else}
                fa-headphones
`;
