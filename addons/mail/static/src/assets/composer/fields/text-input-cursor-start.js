/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            textInputCursorStart
        [Field/model]
            Composer
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/default]
            0
`;
