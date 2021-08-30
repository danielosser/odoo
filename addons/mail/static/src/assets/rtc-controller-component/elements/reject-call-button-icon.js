/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            rejectCallButtonIcon
        [Element/model]
            RtcControllerComponent
        [Model/traits]
            RtcControllerComponent/buttonIcon
        [web.Element/class]
            fa-phone
`;
