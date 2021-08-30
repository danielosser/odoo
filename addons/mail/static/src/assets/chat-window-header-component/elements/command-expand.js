/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            commandExpand
        [Element/model]
            ChatWindowHeaderComponent
        [Model/traits]
            ChatWindowHeaderComponent/command
        [Element/isPresent]
            @record
            .{ChatWindowHeaderComponent/isExpandable}
        [Element/onClick]
            {web.Event/stopPropagation}
                @ev
            {ChatWindow/expand}
                @record
                .{ChatWindowHeaderComponent/chatWindow}
        [web.Element/title]
            {Locale/text}
                Open in Discuss
`;
