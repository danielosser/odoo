/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            rtcSession
        [Field/model]
            RtcVideoComponent
        [Field/type]
            o2m
        [Field/target]
            RtcSession
        [Field/isRequired]
            true
`;
