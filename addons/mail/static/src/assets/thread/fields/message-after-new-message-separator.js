/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the message before which the "new message" separator must
        be positioned, if any.
    {Field}
        [Field/name]
            messageAfterNewMessageSeparator
        [Field/model]
            Thread
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/compute]
            {if}
                @record
                .{Thread/model}
                .{!=}
                    mail.channel
            .{then}
                {Record/empty}
                {break}
            {if}
                @record
                .{Thread/localMessageUnreadCounter}
                .{=}
                    0
            .{then}
                {Record/empty}
                {break}
            :index
                @record
                .{Thread/orderedMessages}
                .{Collection/findIndex}
                    {func}
                        [in]
                            item
                        [out]
                            @item
                            .{Message/id}
                            .{=}
                                @record
                                .{Thread/lastSeenByCurrentPartnerMessageId}
            {if}
                @index
                .{=}
                    -1
            .{then}
                {Record/empty}
                {break}
            {if}
                @record
                .{Thread/orderedMessages}
                .{Collection/length}
                .{<}
                    @index
                    .{+}
                        1
            .{then}
                {Record/empty}
            .{else}
                @record
                .{Thread/orderedMessages}
                .{Collection/at}
                    @index
                    .{+}
                        1
`;
