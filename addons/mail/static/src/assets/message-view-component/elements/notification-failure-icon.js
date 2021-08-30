/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            notificationFailureIcon
        [Element/model]
            MessageViewComponent
        [web.Element/tag]
            i
        [Model/traits]
            MessageViewComponent/notificationIcon
        [web.Element/class]
            fa
            fa-envelope
`;
