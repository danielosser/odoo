/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            joinCallButtonIcon
        [Element/model]
            RtcControllerComponent
        [Model/traits]
            RtcControllerComponent/buttonIcon
        [web.Element/class]
            fa-video-camera
`;
