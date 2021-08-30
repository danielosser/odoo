/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            alertLoadingFailedRetryButton
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            button
        [web.Element/class]
            btn
            btn-link
        [Element/onClick]
            {if}
                @record
                .{MessageListComponent/threadView}
                .{isFalsy}
            .{then}
                {break}
            {if}
                @record
                .{MessageListComponent/threadView}
                .{ThreadView/threadCache}
                .{isFalsy}
            .{then}
                {break}
            {Record/update}
                [0]
                    @record
                    .{MessageListComponent/threadView}
                    .{ThreadView/threadCache}
                [1]
                    [ThreadCache/hasLoadingFailed]
                        false
            {MessageListComponent/_loadMore}
                @record
        [web.Element/textContent]
            {Locale/text}
                Click here to retry
`;
