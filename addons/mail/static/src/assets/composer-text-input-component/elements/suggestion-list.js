/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            suggestionList
        [Element/model]
            ComposerTextInputComponent
        [Field/target]
            ComposerSuggestionListComponent
        [Element/isPresent]
            @record
            .{ComposerTextInputComponent/composerView}
            .{ComposerView/hasSuggestions}
        [Element/props]
            [ComposerSuggestionListComponent/composerView]
                @record
                .{ComposerTextInputComponent/composerView}
            [ComposerSuggestionListComponent/isBelow]
                @record
                .{ComposerTextInputComponent/hasMentionSuggestionsBelowPosition}
`;
