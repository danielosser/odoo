/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Scrolls to a given message view and briefly highlights it.
    {Action}
        [Action/name]
            MessageListComponent/_highlightMessageView
        [Action/params]
            record
                [type]
                    MessageListComponent
            messageView
                [type]
                    MessageView
        [Action/behavior]
            {if}
                {Record/exists}
                    @messageView
                .{&}
                    @messageView
                    .{MessageView/component}
            .{then}
                {web.Element/scrollIntoView}
                    [0]
                        @messageView
                        .{MessageView/component}
                    [1]
                        [behavior]
                            smooth
                        [block]
                            center
                {MessageView/highlight}
                    @messageView
`;