/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            attachmentBoxView
        [Field/model]
            Chatter
        [Field/type]
            o2o
        [Field/target]
            AttachmentBoxView
        [Field/isCausal]
            true
        [Field/inverse]
            AttachmentBoxView/chatter
`;
