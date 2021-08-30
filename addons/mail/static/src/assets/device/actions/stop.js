/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Device/stop
        [Action/params]
            device
        [Action/behavior]
            {web.Browser/offResize}
                @device
                .{Device/_onResize}
            {Record/update}
                [0]
                    @device
                [1]
                    [Device/_onResize]
                        {func}
`;
