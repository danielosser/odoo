/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            tools
        [Element/model]
            ActivityComponent
        [Element/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/canWrite}
        [web.Element/style]
            [web.scss/display]
                flex
`;
