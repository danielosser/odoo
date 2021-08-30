/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttDelayName
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/optionName
        [web.Element/textContent]
            {Locale/text}
                Delay after releasing push-to-talk
`;
