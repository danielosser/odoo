/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether this thread viewer has a member list.
        Only makes sense if thread.hasMemberListFeature is true.
    {Field}
        [Field/name]
            hasMemberList
        [Field/model]
            ThreadView
        [Field/type]
            attr
        [Field/related]
            ThreadView/threadViewer
            ThreadViewer/hasMemberList
`;
