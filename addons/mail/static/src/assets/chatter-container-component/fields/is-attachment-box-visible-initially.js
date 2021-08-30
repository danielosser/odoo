/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isAttachmentBoxVisibleInitially
        [Field/model]
            ChatterContainerComponent
        [Field/type]
            attr
        [Field/target]
            Boolean
`;
