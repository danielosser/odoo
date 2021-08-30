/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        True if an unlink RPC is pending, used to prevent multiple
        unlink attempts.
    {Field}
        [Field/name]
            isUnlinkPending
        [Field/model]
            Attachment
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;
