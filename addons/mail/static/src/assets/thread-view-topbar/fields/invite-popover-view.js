/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            invitePopoverView
        [Field/model]
            ThreadViewTopbar
        [Field/type]
            o2o
        [Field/target]
            PopoverView
        [Field/isCausal]
            true
        [Field/inverse]
            PopoverView/threadViewTopbarOwner
`;