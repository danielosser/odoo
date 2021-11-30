/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            voiceDetectionLabel
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/optionLabel
        [web.Element/title]
            {Locale/text}
                Minimum activity for voice detection
        [web.Element/aria-label]
            {Locale/text}
                Minimum activity for voice detection
`;
