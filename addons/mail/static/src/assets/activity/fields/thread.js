/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines to which "thread" (using 'mail.activity.mixin' on the
        server) 'this' belongs to.
    {Field}
        [Field/name]
            thread
        [Field/model]
            Activity
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/inverse]
            Thread/activities
`;
