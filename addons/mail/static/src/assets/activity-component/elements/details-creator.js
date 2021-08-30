/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsCreator
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            span
        [web.Element/textContent]
            @record
            .{ActivityComponent/activity}
            .{Activity/creator}
            .{User/nameOrDisplayName}
        [web.Element/style]
            [web.scss/font-weight]
                bold
`;
