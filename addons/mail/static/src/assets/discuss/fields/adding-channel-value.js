/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Value that is used to create a channel from the sidebar.
    {Field}
        [Field/name]
            addingChannelValue
        [Field/model]
            Discuss
        [Field/type]
            attr
        [Field/target]
            String
        [Field/compute]
            {if}
                @record
                .{Discuss/isOpen}
                .{isFalsy}
            .{then}
                {Record/empty}
            .{else}
                @record
                .{Discuss/addingChannelValue}
`;
