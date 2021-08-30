/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            descriptionTermType
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            dt
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/type}
        [web.Element/textContent]
            {Locale/text}
                Activity type
`;
