/** @odoo-module **/

import { Define } from '@mail/define';

import { usePosition } from '@web/core/position/position_hook';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onCreate
        [Lifecycle/model]
            PopoverViewComponent
        [Lifecycle/behavior]
            ${
                () => usePosition(
                    Define`
                        {func}
                            {if}
                                @record
                                .{PopoverViewComponent/popoverView}
                                .{isFalsy}
                            .{then}
                                {break}
                            {if}
                                @record
                                .{PopoverViewComponent/popoverView}
                                .{PopoverView/anchorRef}
                                .{isFalsy}
                            .{then}
                                {break}
                            @record
                            .{PopoverViewComponent/popoverView}
                            .{PopoverView/anchorRef}
                    `,
                    Define`
                        [margin]
                            16
                        [position]
                            @record
                            .{PopoverViewComponent/popoverView}
                            .{PopoverView/position}
                    `,
                )
            }
`;
