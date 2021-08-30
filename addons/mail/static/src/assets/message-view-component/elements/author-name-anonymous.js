/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            authorNameAnonymous
        [Element/model]
            MessageViewComponent
        [Model/traits]
            MessageViewComponent/authorName
        [Element/isPresent]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/message}
            .{Message/author}
            .{isFalsy}
            .{&}
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
                .{Message/guestAuthor}
                .{isFalsy}
            .{&}
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
                .{Message/emailFrom}
                .{isFalsy}
        [web.Element/textContent]
            {Locale/text}
                Anonymous
`;
