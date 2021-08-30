/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            trackingValueFieldName
        [Element/model]
            MessageViewComponent
        [Model/traits]
            MessageViewComponent/trackingValueItem
        [web.Element/textContent]
            @template
            .{Template/value}
            .{TrackingValue/changed_field}
`;
