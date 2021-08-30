/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            options
        [Element/model]
            RtcOptionListComponent
        [Model/traits]
            RtcOptionListComponent/button
        [Element/onClick]
            {RtcOptionList/onClickOptions}
                [0]
                    @record
                    .{RtcOptionListComponent/rtcOptionList}
                [1]
                    @ev
`;
