/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        All messages ordered like they are displayed. This field does not
        contain transient messages which are not "real" records.
    {Field}
        [Field/name]
            orderedNonTransientMessages
        [Field/model]
            Thread
        [Field/type]
            m2m
        [Field/target]
            Message
        [Field/compute]
            @record
            .{Thread/orderedMessages}
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        @item
                        .{Message/isTransient}
                        .{isFalsy}
`;
