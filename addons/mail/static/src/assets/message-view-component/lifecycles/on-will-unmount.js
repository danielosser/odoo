/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onWillUnmount
        [Lifecycle/model]
            MessageViewComponent
        [Lifecycle/behavior]
            {web.Browser/clearInterval}
                @record
                .{MessageViewComponent/_intervalId}
`;
