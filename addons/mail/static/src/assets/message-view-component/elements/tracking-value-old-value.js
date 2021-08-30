/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            trackingValueOldValue
        [Element/model]
            MessageViewComponent
        [Model/traits]
            MessageViewComponent/trackingValueItem
        [Element/isPresent]
            @template
            .{Template/value}
            .{TrackingValue/old_value}
        [web.Element/textContent]
            @template
            .{Template/value}
            .{TrackingValue/old_value}
`;
