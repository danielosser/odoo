/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            alertLoadingFailed
        [Element/model]
            MessageListComponent
        [web.Element/class]
            alert
            alert-info
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{&}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/threadCache}
                .{ThreadCache/hasLoadingFailed}
        [web.Element/style]
            [web.scss/display]
                flex
            [web.scss/align-items]
                center
`;
