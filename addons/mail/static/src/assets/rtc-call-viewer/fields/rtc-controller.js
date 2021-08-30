/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The model for the controller (buttons).
    {Field}
        [Field/name]
            rtcController
        [Field/model]
            RtcCallViewer
        [Field/type]
            o2o
        [Field/target]
            RtcController
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/isCausal]
            true
        [Field/inverse]
            RtcController/callViewer
        [Field/default]
            {Record/insert}
                [Record/traits]
                    RtcController
`;
