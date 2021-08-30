/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            rtcOptionList
        [Field/model]
            RtcController
        [Field/type]
            o2o
        [Field/target]
            RtcOptionList
        [Field/inverse]
            RtcOptionList/rtcController
        [Field/isCausal]
            true
        [Field/isRequired]
            true
        [Field/default]
            {Record/insert}
                [Record/traits]
                    RtcOptionList
`;
