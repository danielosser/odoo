/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the message action list of this message view (if any).
    {Field}
        [Field/name]
            messageActionList
        [Field/model]
            MessageView
        [Field/type]
            o2o
        [Field/target]
            MessageActionList
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/inverse]
            MessageActionList/messageView
        [Field/compute]
            {if}
                @record
                .{MessageView/messageActionListWithDelete}
                .{isFalsy}
            .{then}
                {Record/insert}
                    [Record/traits]
                        MessageActionList
            .{else}
                {Record/empty}
`;
