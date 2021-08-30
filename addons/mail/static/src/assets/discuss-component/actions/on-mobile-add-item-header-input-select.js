/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            DiscussComponent/_onMobileAddItemHeaderInputSelect
        [Action/params]
            ev
            record
            ui
        [Action/behavior]
            {if}
                @record
                .{DiscussComponent/discuss}
                .{Discuss/isAddingChannel}
            .{then}
                {Discuss/handleAddChannelAutocompleteSelect}
                    [0]
                        @record
                        .{DiscussComponent/discuss}
                    [1]
                        @ev
                    [2]
                        ui
            .{else}
                {Discuss/handleAddChatAutocompleteSelect}
                    [0]
                        @record
                        .{DiscussComponent/discuss}
                    [1]
                        @ev
                    [2]
                        @ui
`;
