/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the OWL component of this option list.
    {Field}
        [Field/name]
            rtcController
        [Field/model]
            RtcOptionList
        [Field/type]
            o2o
        [Field/target]
            RtcController
        [Field/inverse]
            RtcController/rtcOptionList
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
`;
