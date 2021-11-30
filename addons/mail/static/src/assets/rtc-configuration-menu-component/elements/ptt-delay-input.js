/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttDelayInput
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/inputGroupInput
        [web.Element/min]
            1
        [web.Element/max]
            2000
        [web.Element/step]
            1
        [web.Element/value]
            {Env/userSetting}
            .{UserSetting/voiceActiveDuration}
        [Element/onChange]
            {RtcConfigurationMenuComponent/_onChangeDelay}
                [0]
                    @record
                [1]
                    @ev
`;
