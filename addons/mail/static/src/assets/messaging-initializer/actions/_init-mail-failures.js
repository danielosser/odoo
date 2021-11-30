/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessagingInitializer/_initMailFailures
        [Action/params]
            messagingInitializer
                [type]
                    MessagingInitializer
            mailFailuresData
                [type]
                    Object
        [Action/behavior]
            {Utils/executeGracefully}
                @mailFailuresData
                .{Collection/map}
                    {func}
                        [in]
                            item
                        [out]
                            :message
                                {Record/insert}
                                    [Record/traits]
                                        Message
                                    {Message/convertData}
                                        @item
                            {Dev/comment}
                                implicit: failures are sent by the server
                                at initialization only if the current
                                partner is author of the message
                            {if}
                                @message
                                .{Message/author}
                                .{isFalsy}
                                .{&}
                                    {Env/currentPartner}
                            .{then}
                                {Record/update}
                                    [0]
                                        @message
                                    [1]
                                        [Message/author]
                                            {Env/currentPartner}
`;