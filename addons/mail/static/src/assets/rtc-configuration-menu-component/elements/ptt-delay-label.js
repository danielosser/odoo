/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            pttDelayLabel
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/optionLabel
        [web.Element/title]
            {Locale/text}
                Delay after releasing push-to-talk
        [web.Element/aria-label]
            {Locale/text}
                Delay after releasing push-to-talk
`;
