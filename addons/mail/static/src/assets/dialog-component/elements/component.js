/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            component
        [Element/model]
            DialogComponent
        [Field/target]
            @record
            .{DialogComponent/dialog}
            .{Dialog/record}
            .{Record/modelName}
        [Element/isPresent]
            @record
            .{DialogComponent/dialog}
            .{Dialog/record}
        [Element/props]
            {entry}
                [key]
                    @record
                    .{DialogComponent/dialog}
                    .{Dialog/record}
                    .{Record/modelName}
                    .{+}
                        /record
                [value]
                    @record
                    .{DialogComponent/dialog}
                    .{Dialog/record}
`;
