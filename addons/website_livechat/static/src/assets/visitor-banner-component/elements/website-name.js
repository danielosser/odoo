/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            websiteName
        [Element/model]
            VisitorBannerComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            @record
            .{VisitorBannerComponent/visitor}
            .{Visitor/websiteName}
`;
