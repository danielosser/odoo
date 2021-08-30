/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            AutocompleteInputComponent
        [Model/fields]
            customClass
            doFocus
            isFocusOnMount
            isHtml
            placeholder
            select
            source
        [Model/template]
            root
        [Model/actions]
            AutocompleteInputComponent/_hide
            AutocompleteInputComponent/contains
            AutocompleteInputComponent/focus
            AutocompleteInputComponent/_onAutocompleteFocus
            AutocompleteInputComponent/_onAutocompleteSelect
            AutocompleteInputComponent/_onAutocompleteSource
        [Model/lifecycles]
            onMounted
            onWillUnmount
`;
