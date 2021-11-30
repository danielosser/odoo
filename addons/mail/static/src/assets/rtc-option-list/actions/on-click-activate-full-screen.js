/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Action}
        [Action/name]
            RtcOptionList/onClickActivateFullScreen
        [Action/params]
            ev
                [type]
                    MouseEvent
            record
                [type]
                    RtcOptionList
        [Action/behavior]
            {CallViewer/activateFullScreen}
                @record
                .{RtcOptionList/rtcController}
                .{RtcController/callViewer}
            {Component/trigger}
                [0]
                    @record
                    .{RtcOptionList/component}
                [1]
                    o-popover-close
`;
