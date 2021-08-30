/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttName
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
           RtcConfigurationMenuComponent/optionName
        [web.Element/textContent]
            {Locale/text}
                Use Push-to-talk
`;
