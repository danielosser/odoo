/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commandCloseNotAsBack
        [Element/model]
            ChatWindowHeaderComponent
        [Model/traits]
            ChatWindowHeaderComponent/command
            ChatWindowHeaderComponent/commandClose
        [web.Element/title]
            {Locale/text}
                Close chat window
        [Element/isPresent]
            @record
            .{ChatWindowHeaderComponent/hasCloseAsBackButton}
            .{isFalsy}
        [Element/onClick]
            {web.Event/stopPropagation}
                @ev
            {ChatWindow/close}
                @record
                .{ChatWindowHeaderComponent/chatWindow}
`;
