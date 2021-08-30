/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            ChatterComponent/getScrollableElement
        [Action/params]
            record
        [Action/behavior]
            {if}
                @record
                .{ChatterComponent/scrollPanel}
                .{isFalsy}
            .{then}
                {break}
            @record
            .{ChatterComponent/scrollPanel}
`;
