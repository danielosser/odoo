/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Serves as compute dependency.
    {Field}
        [Field/name]
            lastNonTransientMessage
        [Field/model]
            ThreadView
        [Field/type]
            m2o
        [Field/target]
            Message
        [Field/related]
            ThreadView/thread
            Thread/lastNonTransientMessage
`;
