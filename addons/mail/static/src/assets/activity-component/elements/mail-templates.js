/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            mailTemplates
        [Element/model]
            ActivityComponent
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/mailTemplates}
            .{Collection/length}
            .{>}
                0
`;
