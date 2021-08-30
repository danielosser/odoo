/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the thread view linked to this discuss public view.
    {Field}
        [Field/name]
            threadView
        [Field/model]
            DiscussPublicView
        [Field/type]
            o2o
        [Field/target]
            ThreadView
        [Field/isReadonly]
            true
        [Field/related]
            DiscussPublicView/threadViewer
            ThreadViewer/threadView
`;
