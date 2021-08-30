/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            ChannelCommand
        [Model/fields]
            channelTypes
            help
            name
        [Model/id]
            ChannelCommand/name
        [Model/actions]
            ChannelCommand/execute
            ChannelCommand/fetchSuggestions
            ChannelCommand/getSuggestionSortFunction
            ChannelCommand/searchSuggestions
`;
