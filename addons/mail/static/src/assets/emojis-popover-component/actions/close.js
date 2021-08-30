/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            EmojisPopoverComponent/close
        [Action/params]
            record
        [Action/behavior]
            {Component/trigger}
                [0]
                    @record
                [1]
                    o-popover-close
`;
