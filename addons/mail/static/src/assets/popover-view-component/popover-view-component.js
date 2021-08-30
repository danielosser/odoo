/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            PopoverViewComponent
        [Model/fields]
            popoverView
        [Model/template]
            root
                channelInvitationForm
        [Model/lifecycle]
            onCreate
`;
