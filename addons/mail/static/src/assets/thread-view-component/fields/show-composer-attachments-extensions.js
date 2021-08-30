/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            showComposerAttachmentsExtensions
        [Field/model]
            ThreadViewComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            true
`;
