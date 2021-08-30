/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        States the description of this thread. Only applies to channels.
    {Field}
        [Field/name]
            description
        [Field/model]
            Thread
        [Field/type]
            attr
        [Field/target]
            String
`;
