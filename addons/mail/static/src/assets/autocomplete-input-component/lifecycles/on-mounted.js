/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onMounted
        [Lifecycle/model]
            AutocompleteInputComponent
        [Lifecycle/behavior]
            {if}
                @record
                .{AutocompleteInputComponent/isFocusOnMount}
            .{then}
                {UI/focus}
                    @record
                    .{AutocompleteInputComponent/root}
            ${
                () => {
                    const autoCompleteElem = $(
                        Define`
                            @record
                            .{AutocompleteInputComponent/root}
                        `,
                    ).autocomplete(
                        Define`
                            {Record/insert}
                                [Record/traits]
                                    Dict
                                [autoFocus]
                                    true
                                [select]
                                    {func}
                                        [in]
                                            ev
                                            ui
                                        [out]
                                            {AutocompleteInputComponent/_onAutocompleteSelect}
                                                @record
                                                @ev
                                                @ui
                                [source]
                                    {func}
                                        [in]
                                            req
                                            res
                                        [out]
                                            {AutocompleteInputComponent/_onAutocompleteSource}
                                                @req
                                                @res
                                [focus]
                                    {func}
                                        [in]
                                            ev
                                        [out]
                                            {AutocompleteInputComponent/_onAutocompleteFocus}
                                                @record
                                                @ev
                                [html]
                                    @record
                                    .{AutocompleteInputComponent/isHtml}
                                    .{|}
                                        false
                                {if}
                                    @record
                                    .{AutocompleteInputComponent/customClass}
                                {then}
                                    [classes]
                                        [ui-autocomplete]
                                            @record
                                            .{AutocompleteInputComponent/customClass}
                        `,
                    );
                    // Resize the autocomplete dropdown options to handle the long strings
                    // By setting the width of dropdown based on the width of the input element.
                    autoCompleteElem.data('ui-autocomplete')._resizeMenu = function () {
                        const ul = this.menu.element;
                        ul.outerWidth(this.element.outerWidth());
                    };
                }
            }
`;
