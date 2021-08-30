/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hasComposerFocus
        [Field/model]
            ThreadView
        [Field/type]
            attr
        [Field/related]
            ThreadView/composerView
            Composer/hasFocus
`;
