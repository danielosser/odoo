/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inputGroupValue
        [Element/model]
            RtcConfigurationMenuComponent
        [web.Element/tag]
            span
        [web.Element/style]
            [web.scss/padding]
                {scss/map-get}
                    {scss/$spacers}
                    1
`;
