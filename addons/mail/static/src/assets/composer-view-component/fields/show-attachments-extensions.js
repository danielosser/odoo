/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            showAttachmentsExtensions
        [Field/model]
            ComposerViewComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
`;
