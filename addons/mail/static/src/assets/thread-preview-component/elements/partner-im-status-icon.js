/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            partnerImStatusIcon
        [Element/model]
            ThreadPreviewComponent
        [Field/target]
            PartnerImStatusIconComponent
        [Model/traits]
            NotificationListItemComponent/partnerImStatusIcon
        [Element/isPresent]
            @record
            .{ThreadPreviewComponent/thread}
            .{Thread/correspondent}
            .{&}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/correspondent}
                .{Partner/imStatus}
        [Element/props]
            [PartnerImStatusIconComponent/partner]
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/correspondent}
        [web.Element/style]
            {if}
                @record
                .{ThreadPreviewComponent/thread}
                .{Thread/localMessageUnreadCounter}
                .{=}
                    0
            .{then}
                [web.scss/color]
                    {scss/$o-mail-notification-list-item-muted-background-color}
`;
