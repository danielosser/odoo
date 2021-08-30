/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttLabel
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
           RtcConfigurationMenuComponent/optionLabel
        [web.Element/title]
            {Locale/text}
                Use Push-to-talk
        [web.Element/aria-label]
            {Locale/text}
                Use Push-to-talk
`;
