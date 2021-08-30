/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the 'ThreadView' displaying 'this.thread'.
    {Field}
        [Field/name]
            threadView
        [Field/model]
            Chatter
        [Field/type]
            o2o
        [Field/target]
            ThreadView
        [Field/related]
            Chatter/threadViewer
            ThreadViewer/threadView
`;
