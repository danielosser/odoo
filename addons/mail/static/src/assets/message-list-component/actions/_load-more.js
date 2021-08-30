/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageListComponent/_loadMore
        [Action/params]
            record
                [type]
                    MessageListComponent
        [Action/behavior]
            {if}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/threadCache}
                .{isFalsy}
            .{then}
                {break}
            {ThreadCache/loadMoreMessages}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/threadCache}
`;
