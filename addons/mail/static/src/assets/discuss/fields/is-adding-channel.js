/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determine whether current user is currently adding a channel from
        the sidebar.
    {Field}
        [Field/name]
            isAddingChannel
        [Field/model]
            Discuss
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
        [Field/compute]
            {if}
                @record
                .{Discuss/isOpen}
                .{isFalsy}
            .{then}
                false
            .{else}
                @record
                .{Discuss/isAddingChannel}
`;
