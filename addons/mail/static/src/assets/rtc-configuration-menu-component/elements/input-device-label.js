/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inputDeviceLabel
        [Element/model]
            RtcConfigurationMenuComponent
        [Model/traits]
            RtcConfigurationMenuComponent/optionLabel
        [web.Element/title]
            {Locale/text}
                Input device
        [web.Element/aria-label]
            {Locale/text}
                Input device
`;
