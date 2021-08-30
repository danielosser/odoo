/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        If set, this popover view is owned by a thread view topbar record.
    {Field}
        [Field/name]
            threadViewTopbarOwner
        [Field/model]
            PopoverView
        [Field/type]
            o2o
        [Field/target]
            ThreadViewTopbar
        [Field/isReadonly]
            true
        [Field/inverse]
            ThreadViewTopbar/invitePopoverView
`;
