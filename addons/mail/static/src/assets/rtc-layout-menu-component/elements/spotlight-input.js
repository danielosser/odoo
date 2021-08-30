/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            spotlightInput
        [Element/model]
            RtcLayoutMenuComponent
        [Model/traits]
            RtcLayoutMenuComponent/input
        [web.Element/name]
            layout
        [web.Element/value]
            spotlight
        [Element/onClick]
            {RtcLayoutMenu/onClickLayout}
                [0]
                    @record
                    .{RtcLayoutMenuComponent/layoutMenu}
                [1]
                    @ev
        [web.Element/isChecked]
            {Env/userSetting}
            .{UserSetting/rtcLayout}
            .{=}
                spotlight
`;
