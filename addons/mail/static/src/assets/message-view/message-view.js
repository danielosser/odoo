/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            MessageView
        [Model/fields]
            attachmentList
            component
            composerForEditing
            composerViewInEditing
            highlightTimeout
            isHighlighted
            isSquashed
            message
            messageActionList
            messageActionListWithDelete
            messageInReplyToView
            threadView
        [Model/id]
            MessageView/message
            .{&}
                MessageView/threadView
                .{|}
                    MessageView/messageActionListWithDelete
        [Model/actions]
            MessageView/highlight
            MessageView/replyTo
            MessageView/startEditing
            MessageView/stopEditing
`;
