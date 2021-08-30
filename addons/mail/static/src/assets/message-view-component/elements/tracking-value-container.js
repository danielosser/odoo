/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            trackingValueContainer
        [Element/model]
            MessageViewComponent
        [web.Element/tag]
            li
        [Element/t-foreach]
            {MessageViewComponent/getTrackingValues}
                @record
        [Element/t-as]
            value
        [Element/t-key]
            @template
            .{Template/value}
            .{TrackingValue/id}
`;
