/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            Discuss/handleAddChatAutocompleteSource
        [Action/params]
            discuss
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
                                                [value]
                                                    @partner
                                                    .{Partner/nameOrDisplayName}
                                                [label]
                                                    @partner
                                                    .{Partner/nameOrDisplayName}
                            @res
                                {Collection/sortBy}
                                    [0]
                                        @suggestions
                                    [1]
                                        label
                [keyword]
                    {String/escape}
                        @req
                        .{Dict/get}
                            term
                [limit]
                    10
`;
