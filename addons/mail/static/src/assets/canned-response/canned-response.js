/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            CannedResponse
        [Model/fields]
            id
            source
            substitution
        [Model/id]
            CannedResponse/id
        [Model/actions]
            CannedResponse/fetchSuggestions
            CannedResponse/getSuggestionSortFunction
            CannedResponse/searchSuggestions
`;
