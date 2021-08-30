/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isHiddenMenuOpen
        [Field/model]
            ChatWindowManager
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
