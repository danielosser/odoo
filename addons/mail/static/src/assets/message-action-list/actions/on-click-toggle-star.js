/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageActionList/onClickToggleStar
        [Action/params]
            ev
                [type]
                    MouseEvent
        [Action/behavior]
            {Message/toggleStar}
                @record
                .{MessageActionList/message}
`;
