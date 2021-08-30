/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        HTML element that is used as anchor position for this popover view.
    {Field}
        [Field/name]
            anchorRef
        [Field/model]
            PopoverView
        [Field/type]
            attr
        [Field/target]
            Element
        [Field/required]
            true
        [Field/compute]
            {if}
                @record
                .{PopoverView/threadViewTopbarOwner}
            .{then}
                @record
                .{PopoverView/threadViewTopbarOwner}
                .{ThreadViewTopbar/inviteButtonRef}
            .{else}
                {Record/empty}
`;
