/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines whether there is a mention RPC currently in progress.
        Useful to queue a new call if there is already one pending.
    {Field}
        [Field/name]
            _hasMentionRpcInProgress
        [Field/model]
            ComposerView
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            false
`;