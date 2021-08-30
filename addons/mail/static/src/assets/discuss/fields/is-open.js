/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Whether the discuss app is open or not. Useful to determine
        whether the discuss or chat window logic should be applied.
    {Field}
        [Field/name]
            isOpen
        [Field/model]
            Discuss
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
