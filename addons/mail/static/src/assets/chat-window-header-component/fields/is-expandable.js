/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isExpandable
        [Field/model]
            ChatWindowHeaderComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
