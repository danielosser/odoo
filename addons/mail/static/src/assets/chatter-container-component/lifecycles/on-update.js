/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onUpdate
        [Lifecycle/model]
            ChatterContainerComponent
        [Lifecycle/behavior]
            {if}
                @record
                .{ChatterContainerComponent/chatter}
                .{isFalsy}
            .{then}
                {break}
            {Chatter/refresh}
                @record
                .{ChatterContainerComponent/chatter}
`;
