/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            cache
        [Field/model]
            Thread
        [Field/type]
            o2o
        [Field/target]
            ThreadCache
        [Field/inverse]
            thread
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/isRequired]
            true
        [Field/default]
            {Record/insert}
                [Record/traits]
                    ThreadCache
`;
