/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Search for thread matching 'searchTerm'.
    {Action}
        [Action/name]
            Thread/searchChannelsToOpen
        [Action/params]
            limit
            searchTerm
        [Action/behavior]
            :domain
                channel_type
                .{=}
                    channel
                .{&}
                    name
                    .{ilike}
                        @searchTerm
            :fields
                {Record/insert}
                    [Record/traits]
                        Collection
                    channel_type
                    name
            :channelsData
                @env
                .{Env/owlEnv}
                .{Dict/get}
                    services
                .{Dict/get}
                    rpc
                .{Function/call}
                    [model]
                        mail.channel
                    [method]
                        search_read
                    [kwargs]
                        [domain]
                            @domain
                        [fields]
                            @fields
                        [limit]
                            @limit
            {Record/insert}
                [Record/traits]
                    Thread
                @channelsData
                .{Collection/map}
                    {func}
                        [in]
                            item
                        [out]
                            {Thread/convertData}
                                @item
`;
