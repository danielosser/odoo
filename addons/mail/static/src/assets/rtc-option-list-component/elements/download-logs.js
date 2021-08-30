/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            downloadLogs
        [Element/model]
            RtcOptionListComponent
        [Model/traits]
            RtcOptionListComponent/button
        [Element/onClick]
            {RtcOptionList/onClickDownloadLogs}
                [0]
                    @record
                    .{RtcOptionListComponent/rtcOptionList}
                [1]
                    @ev
`;
