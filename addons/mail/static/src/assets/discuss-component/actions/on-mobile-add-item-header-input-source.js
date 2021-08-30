/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            DiscussComponent/_onMobileAddItemHeaderInputSource
        [Action/params]
            record
            req
            res
        [Action/behavior]
            {if}
                @record
                .{DiscussComponent/discuss}
                .{Discuss/isAddingChannel}
            .{then}
                {Discuss/handleAddChannelAutocompleteSource}
                    [0]
                        @record
                        .{DiscussComponent/discuss}
                    [1]
                        @req
                    [2]
                        @res
            .{else}
                {Discuss/handleAddChatAutocompleteSource}
                    [0]
                        @record
                        .{DiscussComponent/discuss}
                    [1]
                        @req
                    [2]
                        @res
`;
