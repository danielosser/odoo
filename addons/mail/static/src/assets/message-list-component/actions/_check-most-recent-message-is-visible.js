/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessageListComponent/_checkMostRecentMessageIsVisible
        [Action/params]
            record
                [type]
                    MessageListComponent
        [Action/behavior]
            {if}
                {MessageListComponent/getMostRecentMessageViewComponent}
                    @record
                .{&}
                    {MessageViewComponent/isPartiallyVisible}
                        {MessageListComponent/getMostRecentMessageViewComponent}
                            @record
            .{then}
                :lastMessageView
                    @record
                    .{MessageListComponent/threadView}
                    .{ThreadView/messageViews}
                    .{Collection/last}
                {if}
                    @lastMessageView
                    .{&}
                        @lastMessageView
                        .{MessageView/component}
                    .{&}
                        {MessageViewComponent/isPartiallyVisible}
                            @lastMessageView
                            .{MessageView/component}
                .{then}
                    {ThreadView/handleVisibleMessage}
                        [0]
                            @record
                            .{MessageListComponent/threadView}
                        [1]
                            @lastMessageView
                            .{MessageView/message}
`;
