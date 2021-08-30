/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            layout
        [Element/model]
            RtcOptionListComponent
        [Model/traits]
            RtcOptionListComponent/button
        [Element/onClick]
            {RtcOptionList/onClickLayout}
                [0]
                    @record
                    .{RtcOptionListComponent/rtcOptionList}
                [1]
                    @ev
`;
