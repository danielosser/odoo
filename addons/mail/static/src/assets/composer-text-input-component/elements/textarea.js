/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            textarea
        [Element/model]
            ComposerTextInputComponent
        [web.Element/tag]
            textarea
        [Model/traits]
            ComposerTextInputComponent/textareaStyle
        [web.Element/style]
            [web.scss/height]
                0
        [web.Element/textContent]
            @record
            .{ComposerTextInputComponent/composerView}
            .{ComposerView/composer}
            .{Composer/textInputContent}
        [web.Element/placeholder]
            {if}
                @record
                .{ComposerTextInputComponent/composerView}
                .{ComposerView/composer}
                .{Composer/thread}
                .{Thread/model}
                .{=}
                    mail.channel
            .{then}
                {if}
                    @record
                    .{ComposerTextInputComponent/composerView}
                    .{ComposerView/composer}
                    .{Composer/thread}
                    .{Thread/correspondent}
                .{then}
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                Message %s...
                        [1]
                            @record
                            .{ComposerTextInputComponent/composerView}
                            .{ComposerView/composer}
                            .{Composer/thread}
                            .{Thread/correspondent}
                            .{Partner/nameOrDisplayName}
                .{else}
                    {String/sprintf}
                        [0]
                            {Locale/text}
                                Message #%s...
                        [1]
                            @record
                            .{ComposerTextInputComponent/composerView}
                            .{ComposerView/composer}
                            .{Composer/thread}
                            .{Thread/displayName}
            .{elif}
                @record
                .{ComposerTextInputComponent/composerView}
                 .{ComposerView/composer}
                .{Composer/isLog}
            .{then}
                {Locale/text}
                    Log an internal note...
            .{else}
                {Locale/text}
                    Send a message to followers...
        [Element/onClick]
            {Dev/comment}
                clicking might change the cursor position
            {ComposerTextInputComponent/saveStateInStore}
                @record
        [Element/onFocusin]
            {Record/update}
                [0]
                    @record
                    .{ComposerTextInputComponent/composerView}
                [1]
                    [ComposerView/hasFocus]
                        true
        [Element/onFocusout]
            {Record/update}
                [0]
                    @record
                    .{ComposerTextInputComponent/composerView}
                [1]
                    [ComposerView/hasFocus]
                        false
        [Element/onInput]
            {ComposerTextInputComponent/saveStateInStore}
                @record
            {if}
                @record
                .{ComposerTextInputComponent/_textareaLastInputValue}
                .{!=}
                    @record
                    .{ComposerTextInputComponent/textarea}
                    .{web.Element/value}
            .{then}
                {Composer/handleCurrentPartnerIsTyping}
                    @record
                    .{ComposerTextInputComponent/composerView}
                    .{ComposerView/composer}
            {Record/update}
                [0]
                    @record
                [1]
                    [ComposerTextInputComponent/_textareaLastInputValue]
                        @record
                        .{ComposerTextInputComponent/textarea}
                        .{web.Element/value}
            {ComposerTextInputComponent/_updateHeight}
                @record
        [Element/onKeydown]
            {switch}
                @ev
                .{web.KeyboardEvent/key}
            .{case}
                [Escape]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {web.Event/preventDefault}
                            @ev
                        {ComposerView/closeSuggestions}
                            @record
                            .{ComposerTextInputComponent/composerView}
                        {Event/markAsHandled}
                            @ev
                            ComposerTextInputComponent.closeSuggestions
                [ArrowUp]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {Dev/comment}
                            We use preventDefault here to avoid keys native actions
                            but actions are handled in keyUp
                        {web.Event/preventDefault}
                            @ev
                [PageUp]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {Dev/comment}
                            We use preventDefault here to avoid keys native actions
                            but actions are handled in keyUp
                        {web.Event/preventDefault}
                            @ev
                [ArrowDown]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {Dev/comment}
                            We use preventDefault here to avoid keys native actions
                            but actions are handled in keyUp
                        {web.Event/preventDefault}
                            @ev
                [PageDown]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {Dev/comment}
                            We use preventDefault here to avoid keys native actions
                            but actions are handled in keyUp
                        {web.Event/preventDefault}
                            @ev
                [Home]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {Dev/comment}
                            We use preventDefault here to avoid keys native actions
                            but actions are handled in keyUp
                        {web.Event/preventDefault}
                            @ev
                [End]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {Dev/comment}
                            We use preventDefault here to avoid keys native actions
                            but actions are handled in keyUp
                        {web.Event/preventDefault}
                            @ev
                [Tab]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {Dev/comment}
                            We use preventDefault here to avoid keys native actions
                            but actions are handled in keyUp
                        {web.Event/preventDefault}
                            @ev
                [Enter]
                    {Dev/comment}
                        ENTER: submit the message only if the dropdown mention
                        proposition is not displayed
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {web.Event/preventDefault}
                            @ev
                        {break}
                    {if}
                        @record
                        .{ComposerTextInputComponent/sendShortcuts}
                        .{Collection/includes}
                            ctrl-enter
                        .{&}
                            @ev
                            .{web.KeyboardEvent/altKey}
                            .{isFalsy}
                        .{&}
                            @ev
                            .{web.KeyboardEvent/ctrlKey}
                        .{&}
                            @ev
                            .{web.KeyboardEvent/metaKey}
                            .{isFalsy}
                        .{&}
                            @ev
                            .{web.KeyboardEvent/shiftKey}
                            .{isFalsy}
                    .{then}
                        {ComposerViewComponent/_postMessage}
                            @record
                            .{ComposerTextInputComponent/composerViewComponent}
                        {web.Env/preventDefault}
                            @ev
                        {break}
                    {if}
                        @record
                        .{ComposerTextInputComponent/sendShortcuts}
                        .{Collection/includes}
                            enter
                        .{&}
                            @ev
                            .{web.KeyboardEvent/altKey}
                            .{isFalsy}
                        .{&}
                            @ev
                            .{web.KeyboardEvent/ctrlKey}
                            .{isFalsy}
                        .{&}
                            @ev
                            .{web.KeyboardEvent/metaKey}
                            .{isFalsy}
                        .{&}
                            @ev
                            .{web.KeyboardEvent/shiftKey}
                            .{isFalsy}
                    .{then}
                        {ComposerViewComponent/_postMessage}
                            @record
                            .{ComposerTextInputComponent/composerViewComponent}
                        {web.Event/preventDefault}
                            @ev
                        {break}
                    {if}
                        @record
                        .{ComposerTextInputComponent/sendShortcuts}
                        .{Collection/includes}
                            meta-enter
                        .{&}
                            @ev
                            .{web.KeyboardEvent/altKey}
                            .{isFalsy}
                        .{&}
                            @ev
                            .{web.KeyboardEvent/ctrlKey}
                            .{isFalsy}
                        .{&}
                            @ev
                            .{web.KeyboardEvent/metaKey}
                        .{&}
                            @ev
                            .{web.KeyboardEvent/shiftKey}
                            .{isFalsy}
                    .{then}
                        {ComposerViewComponent/_postMessage}
                            @record
                            .{ComposerTextInputComponent/composerViewComponent}
                        {web.Event/preventDefault}
                            @ev
        [Element/onKeyup]
            {switch}
                @ev
                .{web.KeyboardEvent/key}
            .{case}
                [Escape]
                    {Dev/comment}
                        already handled in _onKeydownTextarea, break to avoid default
                    {break}
                {Dev/comment}
                    ENTER, HOME, END, UP, DOWN, PAGE UP, PAGE DOWN, TAB:
                    check if navigation in mention suggestions
                [Enter]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {ComposerView/insertSuggestion}
                            @record
                            .{ComposerTextInputComponent/composerView}
                        {ComposerView/closeSuggestions}
                            @record
                            .{ComposerTextInputComponent/composerView}
                        {Record/update}
                            [0]
                                @record
                                .{ComposerTextInputComponent/composerView}
                            [1]
                                [ComposerView/doFocus]
                                    true
                [ArrowUp]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/composer}
                        .{Composer/hasSuggestions}
                        .{isFalsy}
                        .{&}
                            @record
                            .{ComposerTextInputComponent/composerView}
                            .{ComposerView/composer}
                            .{Composer/textInputContent}
                            .{isFalsy}
                        .{&}
                            @record
                            .{ComposerTextInputComponent/composerView}
                            .{ComposerView/threadView}
                    .{then}
                        {ThreadView/startEditingLastMessageFromCurrentUser}
                            @record
                            .{ComposerTextInputComponent/composerView}
                            .{ComposerView/threadView}
                    .{elif}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/composer}
                        .{Composer/hasSuggestions}
                    .{then}
                        {ComposerView/setPreviousSuggestionActive}
                            @record
                            .{ComposerTextInputComponent/composerView}
                        {Record/update}
                            [0]
                                @record
                                .{ComposerTextInputComponent/composerView}
                            [1]
                                [ComposerView/hasToScrollToActiveSuggestion]
                                    true
                [PageUp]
                    .{if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {ComposerView/setPreviousSuggestionActive}
                            @record
                            .{ComposerTextInputComponent/composerView}
                        {Record/update}
                            [0]
                                @record
                                .{ComposerTextInputComponent/composerView}
                            [1]
                                [ComposerView/hasToScrollToActiveSuggestion]
                                    true
                [ArrowDown]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/composer}
                        .{Composer/hasSuggestions}
                        .{isFalsy}
                        .{&}
                            @record
                            .{ComposerTextInputComponent/composerView}
                            .{ComposerView/composer}
                            .{Composer/textInputContent}
                            .{isFalsy}
                        .{&}
                            @record
                            .{ComposerTextInputComponent/composerView}
                            .{ComposerView/composerView}
                    .{then}
                        {ThreadView/startEditingLastMessageFromCurrentUser}
                            @record
                            .{ComposerTextInputComponent/composerView}
                            .{ComposerView/threadView}
                    .{elif}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {ComposerView/setNextSuggestionActive}
                            @record
                            .{ComposerTextInputComponent/composerView}
                        {Record/update}
                            [0]
                                @record
                                .{ComposerTextInputComponent/composerView}
                            [1]
                                [ComposerView/hasToScrollToActiveSuggestion]
                                    true
                [PageDown]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {ComposerView/setNextSuggestionActive}
                            @record
                            .{ComposerTextInputComponent/composerView}
                        {Record/update}
                            [0]
                                @record
                                .{ComposerTextInputComponent/composerView}
                            [1]
                                [ComposerView/hasToScrollToActiveSuggestion]
                                    true
                [Home]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {ComposerView/setFirstSuggestionActive}
                            @record
                            .{ComposerTextInputComponent/composerView}
                        {Record/update}
                            [0]
                                @record
                                .{ComposerTextInputComponent/composerView}
                            [1]
                                [ComposerView/hasToScrollToActiveSuggestion]
                                    true
                [End]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {ComposerView/setLastSuggestionActive}
                            @record
                            .{ComposerTextInputComponent/composerView}
                        {Record/update}
                            [0]
                                @record
                                .{ComposerTextInputComponent/composerView}
                            [1]
                                [ComposerView/hasToScrollToActiveSuggestion]
                                    true
                [Tab]
                    {if}
                        @record
                        .{ComposerTextInputComponent/composerView}
                        .{ComposerView/hasSuggestions}
                    .{then}
                        {if}
                            @ev
                            .{KeyboardEvent/shiftKey}
                        .{then}
                            {ComposerView/setPreviousSuggestionActive}
                                @record
                                .{ComposerTextInputComponent/composerView}
                            {Record/update}
                                [0]
                                    @record
                                    .{ComposerTextInputComponent/composerView}
                                [1]
                                    [ComposerView/hasToScrollToActiveSuggestion]
                                        true
                        .{else}
                            {ComposerView/setNextSuggestionActive}
                                @record
                                .{ComposerTextInputComponent/composerView}
                            {Record/update}
                                [0]
                                    @record
                                    .{ComposerTextInputComponent/composerView}
                                [1]
                                    [ComposerView/hasToScrollToActiveSuggestion]
                                        true
                [Alt]
                    {break}
                [AltGraph]
                    {break}
                [CapsLock]
                    {break}
                [Control]
                    {break}
                [Fn]
                    {break}
                [FnLock]
                    {break}
                [Hyper]
                    {break}
                [Meta]
                    {break}
                [NumLock]
                    {break}
                [ScrollLock]
                    {break}
                [Shift]
                    {break}
                [ShiftSuper]
                    {break}
                [Symbol]
                    {break}
                [SymbolLock]
                    {break}
                []
                    {Dev/comment}
                        Otherwise, check if a mention is typed
                    {ComposerTextInputComponent/saveStateInStore}
                        @record
`;
