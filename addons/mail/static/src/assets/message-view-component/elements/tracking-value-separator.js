/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            trackingValueSeparator
        [Element/model]
            MessageViewComponent
        [Model/traits]
            MessageViewComponent/trackingValueItem
        [web.Element/class]
            fa
            fa-long-arrow-right
        [web.Element/title]
            {Locale/text}
                Changed
        [web.Element/role]
            img
`;
