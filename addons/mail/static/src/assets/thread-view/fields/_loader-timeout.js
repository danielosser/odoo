/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            _loaderTimeout
        [Field/model]
            ThreadView
        [Field/type]
            attr
        [Field/target]
            Number
        [Field/default]
            0
`;
