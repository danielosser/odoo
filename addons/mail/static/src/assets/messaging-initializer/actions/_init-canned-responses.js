/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            MessagingInitializer/_initCannedResponses
        [Action/params]
            messagingInitializer
                [type]
                    MessagingInitializer
            cannedResponsesData
                [type]
                    Collection<Object>
        [Action/behavior]
            {Record/update}
                [0]
                    @env
                [1]
                    [Env/cannedResponses]
                        {Field/add}
                            @cannedResponsesData
                            .{Collection/map}
                                {func}
                                    [in]
                                        item
                                    [out]
                                        {Record/insert}
                                            [Record/traits]
                                                CannedResponse
                                            [CannedResponse/id]
                                                @item
                                                .{Dict/get}
                                                    id
                                            [CannedResponse/source]
                                                @item
                                                .{Dict/get}
                                                    source
                                            [CannedResponse/substitution]
                                                @item
                                                .{Dict/get}
                                                    substitution
`;