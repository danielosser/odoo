/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Link with a composer view to handle attachments.
    {Field}
        [Field/name]
            composerView
        [Field/model]
            AttachmentList
        [Field/type]
            o2o
        [Field/target]
            ComposerView
        [Field/isReadonly]
            true
        [Field/inverse]
            ComposerView/attachmentList
`;
