/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            filter
        [Field/model]
            NotificationListComponent
        [Field/type]
            attr
        [Field/target]
            String
        [Field/validate]
            {Record/insert}
                [Record/traits]
                    Collection
                all
                mailbox
                channel
            .{Collection/includes}
                @field
        [Field/default]
            all
`;
