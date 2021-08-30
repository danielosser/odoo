/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ThreadViewTopbar/onInputThreadNameInput
        [Action/params]
            record
                [type]
                    ThreadViewTopbar
            ev
                [type]
                    web.InputEvent
        [Action/behavior]
            {Record/update}
                [0]
                    @record
                [1]
                    [ThreadViewTopbar/pendingThreadName]
                        @ev
                        .{web.Event/target}
                        .{web.Element/value}
`;