/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            scrollPanel
        [Element/model]
            ChatterComponent
        [Element/onScroll]
            {if}
                @record
                .{ChatterComponent/thread}
            .{then}
                {ThreadViewComponent/onScroll}
                    @record
                    .{ChatterComponent/thread}
                    @ev
        [web.Element/style]
            [web.scss/overflow-y]
                auto
`;
