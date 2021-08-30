/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            authorNameStandard
        [Element/model]
            MessageViewComponent
        [Model/traits]
            MessageViewComponent/authorName
            MessageViewComponent/authorRedirect
        [Element/isPresent]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/message}
            .{Message/author}
        [Element/onClick]
            {Event/markHandled}
                @ev
                MessageViewComponent.ClickAuthorName
            {if}
                @record
                .{MessageViewComponent/messageView}
                .{MessageView/message}
                .{Message/author}
            .{then}
                {Partner/openProfile}
                    @record
                    .{MessageViewComponent/messageView}
                    .{MessageView/message}
                    .{Message/author}
        [web.Element/title]
            {Locale/text}
                Open profile
        [web.Element/textContent]
            @record
            .{MessageViewComponent/messageView}
            .{MessageView/message}
            .{Message/author}
            .{Author/nameOrDisplayName}
`;
