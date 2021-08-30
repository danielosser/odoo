/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            voiceDetectionName
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/optionName
        [web.Element/textContent]
            {Locale/text}
                Minimum activity for voice detection
`;
