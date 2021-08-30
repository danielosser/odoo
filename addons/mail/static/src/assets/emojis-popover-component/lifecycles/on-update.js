/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onUpdate
        [Lifecycle/model]
            EmojisPopoverComponent
        [Lifecycle/behavior]
            {Component/trigger}
                @record
                o-popover-compute
`;
