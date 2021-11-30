/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Fetches partners matching the given search term to extend the
        JS knowledge and to update the suggestion list accordingly.
    {Action}
        [Action/nam]
            Partner/fetchSuggestions
        [Action/params]
            searchTerm
                [type]
                    String
            thread
                [type]
                    Thread
                [description]
                    prioritize and/or restrict result in the context of given
                    thread
        [Action/behavior]
            :kwargs
                {Record/insert}
                    [Record/traits]
                        Object
                    [search]
                        @searchTerm
            :isNonPublicChannel
                @thread
                .{&}
                    @thread
                    .{Thread/model}
                    .{=}
                        mail.channel
                .{&}
                    @thread
                    .{Thread/public}
                    .{!=}
                        public
            {if}
                @isNonPublicChannel
            .{then}
                {Record/update}
                    [channel_id]
                        @thread
                        .{Thread/id}
            :suggestedPartners
                @env
                .{Env/owlEnv}
                .{Dict/get}
                    services
                .{Dict/get}
                    rpc
                .{Function/call}
                    [0]
                        [model]
                            res.partner
                        [method]
                            get_mention_suggestions
                        [kwargs]
                            @kwargs
                    [1]
                        [shadow]
                            true
            :partners
                {Record/insert}
                    [Record/traits]
                        Partner
                    @suggestedPartners
                    .{Collection/map}
                        {func}
                            [in]
                                item
                            [out]
                                {Partner/convertData}
                                    @item
            {if}
                @isNonPublicChannel
            .{then}
                {Record/update}
                    [0]
                        @thread
                    [1]
                        [Thread/members]
                            {Field/add}
                                @partners
`;
