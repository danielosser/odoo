/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            action
        [Field/model]
            MessageActionListComponent
        [Model/traits]
            Hoverable
        [web.Element/tag]
            span
        [web.Element/class]
            fa
            fa-lg
            p-2
        [web.Element/style]
            [web.scss/cursor]
                pointer
            {if}
                @field
                .{web.Element/isHover}
            .{then}
                [web.scss/background-color]
                    {web.scss/mix}
                        {scss/$border-color}
                        {scss/$white}
`;
