/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            customClass
        [Field/model]
            AutocompleteInputComponent
        [Field/type]
            attr
        [Field/target]
            String
`;
