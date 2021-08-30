/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            focusedRtcSession
        [Field/model]
            Env
        [Field/type]
            o2o
        [Field/target]
            RtcSession
`;
