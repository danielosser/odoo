/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ElementAddon}
        [ElementAddon/feature]
            calendar
        [ElementAddon/field]
            ActivityComponent/editButton
        [ElementAddon/model]
            ActivityComponent
        [ElementAddon/isPresent]
            @record
            .{ActivityComponent/activity}
            .{Activity/calendarEventId}
            .{isFalsy}
`;
