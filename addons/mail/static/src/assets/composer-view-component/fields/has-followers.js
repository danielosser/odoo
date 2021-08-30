/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            hasFollowers
        [Field/model]
            ComposerViewComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
