/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageActionList/onClickMarkAsRead
        [Action/params]
            ev
                [type]
                    MouseEvent
        [Action/behavior]
            {Message/markAsRead}
                @record
                .{MessageActionList/message}
`;
