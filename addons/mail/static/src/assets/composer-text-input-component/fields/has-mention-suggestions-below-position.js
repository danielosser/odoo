/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hasMentionSuggestionsBelowPosition
        [Field/model]
            ComposerTextInputComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
