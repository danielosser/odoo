/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States whether the cursor is currently over this thread description in
        the top bar.
    {Field}
        [Field/name]
            isMouseOverThreadDescription
        [Field/model]
            ThreadViewTopbar
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;