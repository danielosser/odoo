/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Determines the 'Thread' that should be displayed by 'this'.
    {Field}
        [Field/name]
            thread
        [Field/model]
            Chatter
        [Field/type]
            m2o
        [Field/target]
            Thread
`;
