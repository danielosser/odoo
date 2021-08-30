/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isCurrentUserGuest
        [Field/model]
            Env
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/compute]
            @record
            .{Env/currentPartner}
            .{isFalsy}
            .{&}
                @record
                .{Env/currentGuest}
`;
