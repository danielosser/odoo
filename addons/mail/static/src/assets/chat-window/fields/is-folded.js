/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether 'this' is folded.
    {Field}
        [Field/name]
            isFolded
        [Field/model]
            ChatWindow
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
