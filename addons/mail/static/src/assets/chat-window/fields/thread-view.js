/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the 'ThreadView' displaying 'this.thread'.
    {Field}
        [Field/name]
            threadView
        [Field/model]
            ChatWindow
        [Field/type]
            o2o
        [Field/target]
            ThreadView
        [Field/related]
            ChatWindow/threadViewer
            ThreadViewer/threadView
`;
