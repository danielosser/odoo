/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Sets the next suggestion as active. Main and extra records are
        considered together.
    {Action}
        [Action/name]
            ComposerView/setNextSuggestionActive
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
                    @suggestedRecords
                    .{Collection/length}
                    .{-}
                        1
            .{then}
                {Dev/comment}
                    loop when reaching the end of the list
                {ComposerView/setFirstSuggestionActive}
                    @record
                {break}
            :nextRecord
                @suggestedRecords
                .{Collection/at}
                    @activeElementIndex
                    .{+}
                        1
            {Record/update}
                [0]
                    @record
                [1]
                    [ComposerView/activeSuggestedRecord]
                        @nextRecord
`;