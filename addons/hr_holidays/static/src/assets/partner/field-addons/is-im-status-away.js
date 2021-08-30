/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {FieldAddon}
        [FieldAddon/field]
            Partner/isImStatusAway
        [FieldAddon/feature]
            hr_holidays
        [FieldAddon/compute]
            @original
            .{|}
                @record
                .{Partner/imStatus}
                .{=}
                    leave_away
`;