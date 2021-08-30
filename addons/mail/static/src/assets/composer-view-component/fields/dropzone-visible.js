/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            dropzoneVisible
        [Field/model]
            ComposerViewComponent
        [Field/type]
            m2o
        [Field/target]
            DropzoneVisibleComponentHook
`;
