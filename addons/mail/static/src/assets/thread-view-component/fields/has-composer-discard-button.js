/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hasComposerDiscardButton
        [Field/model]
            ThreadViewComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
