/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            userDevices
        [Field/model]
            RtcConfigurationMenuComponent
        [Field/default]
            {MediaDevices/enumerateDevices}
                {web.Browser/navigator}
                .{web.Navigator/mediaDevices}
`;
