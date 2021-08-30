/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Most recent message in this ThreadView that has been shown to the
        current partner in the currently displayed thread cache.
    {Field}
        [Field/name]
            lastVisibleMessage
        [Field/model]
            ThreadView
        [Field/type]
            m2o
        [Field/target]
            Message
`;
