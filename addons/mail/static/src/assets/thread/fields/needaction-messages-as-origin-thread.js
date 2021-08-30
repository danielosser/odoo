/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            needactionMessagesAsOriginThread
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/compute]
            @record
            .{Thread/messagesAsOriginThread}
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{Message/isNeedaction}
`;
