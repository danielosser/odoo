/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            WelcomeView/onKeydownGuestNameInput
        [Action/params]
            ev
                [type]
                    web.KeyboardEvent
            record
                [type]
                    WelcomeView
        [Action/behavior]
            {if}
                @ev
                .{web.KeyboardEvent/key}
                .{=}
                    Enter
            .{then}
                {WelcomeView/joinChannel}
                    @record
`;
