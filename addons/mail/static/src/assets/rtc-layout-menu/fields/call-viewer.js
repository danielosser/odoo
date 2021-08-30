/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            callViewer
        [Field/model]
            RtcLayoutMenu
        [Field/type]
            o2o
        [Field/target]
            RtcCallViewer
        [Field/isReadonly]
            true
        [Field/inverse]
            RtcCallViewer/rtcLayoutMenu
`;
