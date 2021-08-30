/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the thread that is displayed by this top bar.
    {Field}
        [Field/name]
            thread
        [Field/model]
            ThreadViewTopbar
        [Field/type]
            m2o
        [Field/target]
            Thread
        [Field/related]
            'ThreadView.thread'
`;