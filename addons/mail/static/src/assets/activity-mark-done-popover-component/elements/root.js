/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            root
        [Element/model]
            ActivityMarkDonePopoverComponent
        [Element/onKeydown]
            {if}
                @ev
                .{web.KeyboardEvent/key}
                .{=}
                    Escape
            .{then}
                {Component/trigger}
                    @record
                    o-popover-close
        [web.Element/style]
            [web.scss/min-height]
                100
                px
`;
