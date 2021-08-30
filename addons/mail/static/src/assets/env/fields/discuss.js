/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            discuss
        [Field/model]
            Env
        [Field/type]
            o2o
        [Field/target]
            Discuss
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/default]
            {Record/insert}
                [Record/traits]
                    Discuss
`;
