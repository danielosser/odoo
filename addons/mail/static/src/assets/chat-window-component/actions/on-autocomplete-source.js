/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Called when typing in the autocomplete input of the 'new_message' chat
        window.
    {Action}
        [Action/name]
            ChatWindowComponent/_onAutocompleteSource
        [Action/params]
            record
            req
            res
        [Action/behavior]
            {Partner/imSearch}
                [callback]
                    {func}
                        [in]
                            partners
                        [out]
                            :suggestions
                                @partners
                                .{Collection/map}
                                    {func}
                                        [in]
                                            item
                                        [out]
                                            {Record/insert}
                                                [Record/traits]
                                                    Dict
                                                [id]
                                                    @partner
                                                    .{Partner/id}
                                                [label]
                                                    @partner
                                                    .{Partner/nameOrDisplayName}
                                                [value]
                                                    @partner
                                                    .{Partner/nameOrDisplayName}
                            @res
                                {Collection/sortBy}
                                    @suggestions
                                    label
                [keyword]
                    {String/escape}
                        @req
                        .{Dict/get}
                            term
                [limit]
                    10
`;
