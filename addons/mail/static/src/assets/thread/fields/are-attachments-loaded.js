/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            areAttachmentsLoaded
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
