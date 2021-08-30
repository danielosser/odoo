/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            descriptionTermAssigned
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            dt
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/assignee}
        [web.Element/textContent]
            {Dev/comment}
                AKU TODO: handle properly local
            {Locale/text}
                Assigned to
`;
