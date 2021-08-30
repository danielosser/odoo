/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        The channel that is hosting the current RTC call.
    {Field}
        [Field/name]
            channel
        [Field/model]
            Rtc
        [Field/type]
            o2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/rtc
`;
