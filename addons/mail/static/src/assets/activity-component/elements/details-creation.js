/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            detailsCreation
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            dd
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/creator}
`;
