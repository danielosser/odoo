/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            rtcOptionList
        [Field/model]
            RtcOptionListComponent
        [Field/type]
            m2o
        [Field/target]
            RtcOptionList
        [Field/isRequired]
            true
        [Field/inverse]
            RtcOptionList/component
`;
