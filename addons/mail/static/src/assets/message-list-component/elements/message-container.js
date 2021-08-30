/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        currentDay: 0
        prevMessage: 0

        for message of getOrderedMessages():
            if message === threadView.thread(mself).messageAfterNewMessageSeparator(mself):
                <separatorNewMessages/>
            if message not empty:
                messageDay: getDateDay(message)
                if currentDay !== messageDay:
                    <separatorDate/>
                    currentDay: messageDay
                    isMessageSquashed: false
                if currentDay === messageDay:
                    isMessageSquashed: shouldMessageBeSquashed(prevMessage, message)
                <message/>
                prevMessage: message
    {Element}
        [Element/name]
            messageContainer
        [Element/model]
            MessageListComponent
        [web.Element/tag]
            t
        [Element/t-foreach]
            @record
            .{MessageListComponent/threadView}
            .{ThreadView/messageViews}
        [Element/t-as]
            messageView
        [Element/t-key]
            @template
            .{Template/messageView}
            .{Record/id}
`;
