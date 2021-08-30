/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Last non-transient message.
    {Field}
        [Field/name]
            lastNonTransientMessage
        [Field/model]
            Thread
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/compute]
            {if}
                @record
                .{Thread/orderedNonTransientMessages}
                .{Collection/last}
            .{then}
                @record
                .{Thread/orderedNonTransientMessages}
                .{Collection/last}
            .{else}
                {Record/empty}
`;
