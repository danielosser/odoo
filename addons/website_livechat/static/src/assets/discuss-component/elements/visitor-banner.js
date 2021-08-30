/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            visitorBanner
        [Element/feature]
            website_livechat
        [Element/model]
            DiscussComponent
        [Field/target]
            VisitorBannerComponent
        [Element/isPresent]
            @record
            .{DiscussComponent/discuss}
            .{Discuss/thread}
            .{Thread/visitor}
        [Element/props]
            [VisitorBannerComponent/visitor]
                @record
                .{DiscussComponent/discuss}
                .{Discuss/thread}
                .{Thread/visitor}
`;
