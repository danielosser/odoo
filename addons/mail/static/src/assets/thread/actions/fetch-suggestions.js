/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Fetches threads matching the given composer search state to extend
        the JS knowledge and to update the suggestion list accordingly.
        More specifically only thread of model 'mail.channel' are fetched.
    {Action}
        [Action/name]
            Thread/fetchSuggestions
        [Action/params]
            searchTerm
                [type]
                    String
            thread
                [type]
                    Thread
                [description]
                    prioritize and/or restrict result in the context of given thread
        [Action/behavior]
            :channelsData
                @env
                .{Env/owlEnv}
                .{Dict/get}
                    services
                .{Dict/get}
                    rpc
                .{Function/call}
                    [0]
                        [model]
                            mail.channel
                        [method]
                            get_mention_suggestions
                        [kwargs]
                            [search]
                                @searchTerm
                    [1]
                        [shadow]
                            true
            {Record/insert}
                [Record/traits]
                    Thread
                @channelsData
                .{Collection/map}
                    {func}
                        [in]
                            item
                        [out]
                            [Thread/model]
                                mail.channel
                            {Thread/convertData}
                                @channelData
`;
