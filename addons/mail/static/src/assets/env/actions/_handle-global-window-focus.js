/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Env/_handleGlobalWindowFocus
        [Action/behavior]
            {Record/update}
                [0]
                    @env
                [1]
                    [Env/outOfFocusUnreadMessageCounter]
                        0
            @env
            .{Env/owlEnv}
            .{Dict/get}
                bus
            .{Dict/get}
                trigger
            .{Function/call}
                [0]
                    set_title_part
                [1]
                    [part]
                        _chat
`;
