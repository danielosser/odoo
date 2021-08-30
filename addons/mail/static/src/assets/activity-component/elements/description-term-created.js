/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            descriptionTermCreated
        [Element/model]
            ActivityComponent
        [web.Element/tag]
            dt
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/creator}
        [web.Element/textContent]
            {Locale/text}
                Created
`;
