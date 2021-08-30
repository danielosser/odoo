/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Element}
        [Element/name]
            inputDeviceOption
        [Element/model]
            RtcConfigurationMenuComponent
        [web.Element/tag]
            option
        [Element/t-foreach]
            @record
            .{RtcConfigurationMenuComponent/userDevices}
        [Element/t-as]
            device
        [Element/t-key]
            @template
            .{Template/device}
            .{Template/index}
        [Element/isPresent]
            @template
            .{Template/device}
            .{Device/kind}
            .{=}
                audioinput
        [web.Element/value]
            @template
            .{Template/device}
            .{Device/deviceId}
        [web.Element/textContent]
            @template
            .{Template/device}
            .{Device/label}
`;
