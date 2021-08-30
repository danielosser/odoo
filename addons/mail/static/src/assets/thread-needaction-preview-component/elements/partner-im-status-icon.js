/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            partnerImStatusIcon
        [Element/model]
            ThreadNeedactionPreviewComponent
        [Field/target]
            PartnerImStatusIconComponent
        [Model/traits]
            NotificationListItemComponent/partnerImStatusIcon
        [Element/isPresent]
            @record
            .{ThreadNeedactionPreviewComponent/thread}
            .{Thread/correspondent}
            .{&}
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/correspondent}
                .{Partner/imStatus}
        [Element/props]
            [PartnerImStatusIconComponent/partner]
                @record
                .{ThreadNeedactionPreviewComponent/thread}
                .{Thread/correspondent}
`;
