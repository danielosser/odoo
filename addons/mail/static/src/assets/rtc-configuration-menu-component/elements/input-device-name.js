/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inputDeviceName
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/optionName
        [web.Element/textContent]
            {Locale/text}
                Input device
`;
