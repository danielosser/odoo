/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            descriptionDetailType
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            dd
        [web.Element/textContent]
            @record
            .{ActivityComponent/activity}
            .{Activity/type}
            .{ActivityType/displayName}
`;
