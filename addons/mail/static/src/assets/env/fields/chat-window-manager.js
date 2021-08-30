/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            chatWindowManager
        [Field/model]
            Env
        [Field/type]
            o2o
        [Field/target]
            ChatWindowManager
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/default]
            {Record/insert}
                [Record/traits]
                    ChatWindowManager
`;
