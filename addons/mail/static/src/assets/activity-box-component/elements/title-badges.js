/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            titleBadges
        [Element/model]
            ActivityBoxComponent
        [web.Element/tag]
            span
        [Element/isPresent]
            @record
            .{ActivityBoxComponent/activityBoxView}
            .{ActivityBoxView/isActivityListVisible}
            .{isFalsy}
        [web.Element/style]
            [web.scss/margin-inline-end]
                {scss/map-get}
                    {scss/$spacers}
                    3
`;
