/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            historyText
        [Element/model]
            VisitorBannerComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            @record
            .{VisitorBannerComponent/visitor}
            .{Visitor/history}
`;
