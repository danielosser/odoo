/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            _isPreparingAttachmentsLoading
        [Field/model]
            Chatter
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
