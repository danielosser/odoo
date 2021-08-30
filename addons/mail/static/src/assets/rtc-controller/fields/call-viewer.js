/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            callViewer
        [Field/model]
            RtcController
        [Field/type]
            o2o
        [Field/target]
            RtcCallViewer
        [Field/inverse]
            RtcCallViewer/rtcController
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;
