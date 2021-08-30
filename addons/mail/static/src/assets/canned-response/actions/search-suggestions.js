/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Returns canned responses that match the given search term.
    {Action}
        [Action/name]
            CannedResponse/searchSuggestions
        [Action/params]
            searchTerm
            [thread]
                [description]
                    prioritize and/or restrict result in the context of
                    given thread
        [Action/behavior]
            {Env/cannedResponses}
            .{Collection/filter}
                {func}
                    [in]
                        item
                    [out]
                        {Utils/cleanSearchTerm}
                            @item
                            .{CannedResponse/source}
            .{Collection/includes}
                {Utils/cleanSearchTerm}
                    @searchTerm
`;
