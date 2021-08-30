/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            loadingMore
        [Element/model]
            MessageListComponent
        [Model/traits]
            MessageListComponent/item
        [Element/isPresent]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/threadCache}
            .{ThreadCache/isLoadingMore}
        [web.Element/style]
            [web.scss/align-self]
                center
`;
