/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Get the scroll height in the message list.
    {Action}
        [Action/name]
            ThreadViewComponent/getScrollHeight
        [Action/params]
            record
                [type]
                    ThreadViewComponent
        [Action/returns]
            Integer
        [Action/behavior]
            {if}
                @record
                .{ThreadViewComponent/messageList}
                .{isFalsy}
            .{then}
                {break}
            {MessageListComponent/getScrollHeight}
                @record
`;
