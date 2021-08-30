/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            select
        [Field/model]
            AutocompleteInputComponent
        [Field/type]
            attr
        [Field/target]
            Function
`;
