/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Lifecycle}
        [Lifecycle/name]
            onDelete
        [Lifecycle/model]
            Chatter
        [Lifecycle/behavior]
            {Chatter/_stopAttachmentsLoading}
                @record
`;
