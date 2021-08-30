/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onDelete
        [Lifecycle/model]
            UserSetting
        [Lifecycle/behavior]
            {foreach}
                @record
                .{UserSetting/_timeoutIds}
            .{as}
                timeoutId
            .{do}
                {Browser/clearTimeout}
                    @timeoutId
`;
