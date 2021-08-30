/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttKeyLabel
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/optionLabel
        [web.Element/title]
            {Locale/text}
                Push-to-talk key
        [web.Element/aria-label]
            {Locale/text}
                Push-to-talk key
`;
