/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/feature]
            calendar
        [Field/name]
            calendarEventId
        [Field/model]
            Activity
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/default]
            false
`;
