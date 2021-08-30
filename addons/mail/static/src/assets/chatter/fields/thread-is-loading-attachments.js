/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Serves as compute dependency.
    {Field}
        [Field/name]
            threadIsLoadingAttachments
        [Field/model]
            Chatter
        [Field/type]
            attr
        [Field/related]
            Chatter/thread
            Thread/isLoadingAttachments
`;
