/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isCompact
        [Field/model]
            ComposerViewComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            true
`;
