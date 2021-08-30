/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ThreadViewComponent/onScroll
        [Action/params]
            record
                [type]
                    ThreadViewComponent
            ev
                [type]
                    MouseEvent
        [Action/behavior]
            {if}
                @record
                .{ThreadViewComponent/messageList}
                .{isFalsy}
            .{then}
                {break}
            {ThreadViewComponent/onScroll}
                [0]
                    @record
                [1]
                    @ev
`;
