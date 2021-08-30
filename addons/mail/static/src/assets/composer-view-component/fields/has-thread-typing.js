/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hasThreadTyping
        [Field/model]
            ComposerViewComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
