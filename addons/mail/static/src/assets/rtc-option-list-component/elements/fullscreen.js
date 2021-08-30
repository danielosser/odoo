/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            fullscreen
        [Element/model]
            RtcOptionListComponent
        [Model/traits]
            RtcOptionListComponent/button
        [Element/isPresent]
            @record
            .{RtcOptionListComponent/rtcOptionList}
            .{RtcOptionList/rtcController}
            .{RtcController/callViewer}
            .{RtcCallViewer/isFullScreen}
            .{isFalsy}
        [Element/onClick]
            {RtcOptionList/onClickActivateFullscreen}
                [0]
                    @record
                    .{RtcOptionListComponent/rtcOptionList}
                [1]
                    @ev
`;
