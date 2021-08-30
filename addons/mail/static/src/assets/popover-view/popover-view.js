/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            PopoverView
        [Model/fields]
            anchorRef
            channelInvitationForm
            component
            device
            position
            threadViewTopbarOwner
        [Model/id]
            PopoverView/threadViewTopbarOwner
            .{&}
                PopoverView/channelInvitationForm
        [Model/actions]
            PopoverView/_onClickCaptureGlobal
`;
