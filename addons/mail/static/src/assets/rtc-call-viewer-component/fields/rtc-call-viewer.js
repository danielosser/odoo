/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            rtcCallViewer
        [Field/model]
            RtcCallViewerComponent
        [Field/type]
            m2o
        [Field/target]
            RtcCallViewer
        [Field/isRequired]
            true
`;
