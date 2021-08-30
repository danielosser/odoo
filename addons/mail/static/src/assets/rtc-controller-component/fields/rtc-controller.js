/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            rtcController
        [Field/model]
            RtcControllerComponent
        [Field/type]
            m2o
        [Field/target]
            RtcController
        [Field/isRequired]
            true
`;
