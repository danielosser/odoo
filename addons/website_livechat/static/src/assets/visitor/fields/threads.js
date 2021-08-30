/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Threads with this visitor as member
    {Field}
        [Field/name]
            threads
        [Field/model]
            Visitor
        [Field/type]
            o2m
        [Field/target]
            Thread
        [Field/inverse]
            Thread/visitor
`;
