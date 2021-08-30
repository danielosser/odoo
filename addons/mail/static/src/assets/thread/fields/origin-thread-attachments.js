/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            originThreadAttachments
        [Field/model]
            Thread
        [Field/type]
            o2m
        [Field/target]
            Attachment
        [Field/inverse]
            originThread
        [Field/isCausal]
            true
`;
