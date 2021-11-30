/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        True if we want to enable the video track of the current partner.
    {Field}
        [Field/name]
            sendDisplay
        [Field/model]
            Rtc
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
