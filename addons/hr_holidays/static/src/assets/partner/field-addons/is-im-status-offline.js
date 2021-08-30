/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {FieldAddon}
        [FieldAddon/field]
            Partner/isImStatusOffline
        [FieldAddon/feature]
            hr_holidays
        [FieldAddon/compute]
            @original
            .{|}
                @record
                .{Partner/imStatus}
                .{=}
                    leave_offline
`;