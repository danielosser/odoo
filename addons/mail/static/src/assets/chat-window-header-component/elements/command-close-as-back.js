/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commandCloseAsBack
        [Element/model]
            ChatWindowHeaderComponent
        [Model/traits]
            ChatWindowHeaderComponent/command
            ChatWindowHeaderComponent/commandBack
            ChatWindowHeaderComponent/commandClose
        [Element/isPresent]
            @record
            .{ChatWindowHeaderComponent/hasCloseAsBackButton}
        [Element/onClick]
            {web.Event/stopPropagation}
                @ev
            {ChatWindow/close}
                @record
                .{ChatWindowHeaderComponent/chatWindow}
        [web.Element/title]
            {Locale/text}
                Close conversation
`;
