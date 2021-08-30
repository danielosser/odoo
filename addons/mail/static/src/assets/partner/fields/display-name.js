/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            displayName
        [Field/model]
            Partner
        [Field/type]
            attr
        [Field/target]
            String
        [Field/compute]
            @record
            .{Partner/displayName}
            .{|}
                @record
                .{Partner/user}
                .{&}
                    @record
                    .{Partner/user}
                    .{User/displayName}
`;
