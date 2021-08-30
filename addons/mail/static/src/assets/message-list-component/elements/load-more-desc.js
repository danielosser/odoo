/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            loadMoreDesc
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            t
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/threadCache}
            .{ThreadCache/hasLoadingFailed}
            .{isFalsy}
            .{&}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/order}
                .{=}
                    desc
`;
