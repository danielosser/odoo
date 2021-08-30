/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isFocusOnMount
        [Field/model]
            AutocompleteInputComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
