/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            itemExtra
        [Element/model]
            ComposerSuggestionListComponent
        [Field/target]
            ComposerSuggestionComponent
        [Element/props]
            [ComposerSuggestionComponent/composerView]
                @record
                .{ComposerSuggestionListComponent/composerView}
            [ComposerSuggestionComponent/isActive]
                @template
                .{Template/record}
                .{=}
                    @record
                    .{ComposerSuggestionListComponent/composerView}
                    .{ComposerView/activeSuggestedRecord}
            [ComposerSuggestionComponent/modelName]
                @record
                .{ComposerSuggestionListComponent/composerView}
                .{ComposerView/suggestionModelName}
            [ComposerSuggestionComponent/record]
                @template
                .{Template/record}
        [Element/t-foreach]
            @record
            .{ComposerSuggestionListComponent/composerView}
            .{ComposerView/extraSuggestedRecords}
        [Element/t-as]
            record
        [Element/t-key]
            @template
            .{Template/record}
            .{Record/id}
`;
