/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        If set, the current thread is the thread that hosts the current RTC call.
    {Field}
        [Field/name]
            rtc
        [Field/model]
            Thread
        [Field/type]
            o2o
        [Field/target]
            Rtc
        [Field/inverse]
            Rtc/channel
`;
