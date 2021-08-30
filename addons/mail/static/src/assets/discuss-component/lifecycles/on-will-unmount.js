/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onWillUnmount
        [Lifecycle/model]
            DiscussComponent
        [Lifecycle/behavior]
            {if}
                @record
                .{DiscussComponent/discuss}
            .{then}
                {Discuss/close}
                    @record
                    .{DiscussComponent/discuss}
`;
