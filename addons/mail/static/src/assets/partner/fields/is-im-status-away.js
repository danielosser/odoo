/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isImStatusAway
        [Field/model]
            Partner
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/compute]
            @record
            .{Partner/imStatus}
            .{=}
                away
`;