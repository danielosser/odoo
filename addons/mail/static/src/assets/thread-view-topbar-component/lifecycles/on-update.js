/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onUpdate
        [Lifecycle/model]
            ThreadViewTopbarComponent
        [Lifecycle/behavior]
            {ThreadViewTopbar/onComponentUpdate}
                @record
                .{ThreadViewTopbarComponent/threadViewTopbar}
`;
