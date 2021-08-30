/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            RtcActivityNoticeComponent
        [web.Element/class]
            dropdown
        [web.Element/style]
            [web.scss/cursor]
                pointer
            {if}
                @field
                .{web.Element/isHover}
            .{then}
                [web.scss/background-color]
                    {scss/rgba}
                        black
                        0.1
`;
