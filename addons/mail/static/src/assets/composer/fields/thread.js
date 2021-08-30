/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the thread which this composer represents the state (if any).
    {Field}
        [Field/name]
            thread
        [Field/model]
            Composer
        [Field/type]
            o2o
        [Field/target]
            Thread
        [Field/isReadonly]
            true
        [Field/inverse]
            Thread/composer
`;
