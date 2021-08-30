/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hasFocus
        [Field/model]
            ComposerView
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
