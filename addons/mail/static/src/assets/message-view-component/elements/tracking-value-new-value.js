/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            trackingValueNewValue
        [Element/model]
            MessageViewComponent
        [Model/traits]
            MessageViewComponent/trackingValueItem
        [Element/isPresent]
            @template
            .{Template/value}
            .{TrackingValue/new_value}
        [web.Element/textContent]
            @template
            .{Template/value}
            .{TrackingValue/new_value}
`;
