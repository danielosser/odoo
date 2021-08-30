/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the message view that this message action list will use to
        display this message in this delete confirmation dialog.
    {Field}
        [Field/name]
            messageViewForDelete
        [Field/model]
            MessageActionList
        [Field/type]
            o2o
        [Field/target]
            MessageView
        [Field/isCausal]
            true
        [Field/inverse]
            MessageView/messageActionListWithDelete
        [Field/compute]
            {if}
                @record
                .{MessageActionList/message}
            .{then}
                {Record/insert}
                    [Record/traits]
                        MessageView
                    [MessageView/message]
                        @record
                        .{MessageActionList/message}
            .{else}
                {Record/empty}
`;
