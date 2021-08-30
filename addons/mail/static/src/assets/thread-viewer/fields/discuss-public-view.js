/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            discussPublicView
        [Field/model]
            ThreadViewer
        [Field/type]
            o2o
        [Field/target]
            DiscussPublicView
        [Field/inverse]
            DiscussPublicView/threadViewer
        [Field/isReadonly]
            true
`;
