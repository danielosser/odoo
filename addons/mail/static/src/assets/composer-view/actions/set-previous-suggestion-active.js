/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Sets the previous suggestion as active. Main and extra records are
        considered together.
    {Action}
        [Action/name]
            ComposerView/setPreviousSuggestionActive
        [Action/params]
            record
                [type]
                    ComposerView
        [Action/behavior]
            :suggestedRecords
                @record
                .{ComposerView/mainSuggestedRecords}
                .{Collection/concat}
                    @record
                    .{ComposerView/extraSuggestedRecords}
            :activeElementIndex
                @suggestedRecords
                .{Collection/findIndex}
                    {func}
                        [in]
                            suggestion
                        [out]
                            @suggestion
                            .{=}
                                @record
                                .{ComposerView/activeSuggestedRecord}
            {if}
                @activeElementIndex
                .{=}
                    0
            .{then}
                {Dev/comment}
                    loop when reaching the start of the list
                {ComposerView/setLastSuggestionActive}
                    @record
                {break}
            :previousRecord
                @suggestedRecords
                .{Collection/at}
                    @activeElementIndex
                    .{-}
                        1
            {Record/update}
                [0]
                    @record
                [1]
                    [ComposerView/activeSuggestedRecord]
                        @previousRecord
`;