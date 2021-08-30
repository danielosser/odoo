/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ThreadViewTopbar/onClickInboxMarkAllAsRead
        [Action/behavior]
            {Message/markAllAsRead}
`;