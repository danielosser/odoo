/** @odoo-module **/

import { Define } from '@mail/define';

import { session } from '@web/session';

export default Define`
    {Dev/comment}
        Whether this message can be deleted.
    {Field}
        [Field/name]
            canBeDeleted
        [Field/model]
            Message
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/compute]
            {if}
                ${!session.is_admin}
                .{&}
                    @record
                    .{Message/isCurrentUserOrGuestAuthor}
                    .{isFalsy}
            .{then}
                false
            .{elif}
                @record
                .{Message/originThread}
                .{isFalsy}
            .{then}
                false
            .{elif}
                @record
                .{Message/trackingValues}
                .{Collection/length}
                .{>}
                    0
            .{then}
                false
            .{elif}
                @record
                .{Message/originThread}
                .{Thread/model}
                .{=}
                    mail.channel
            .{then}
                @record
                .{Message/type}
                .{=}
                    comment
            .{else}
                @record
                .{Message/isNote}
`;
