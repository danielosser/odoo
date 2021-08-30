/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            memberThreads
        [Field/model]
            Partner
        [Field/type]
            m2m
        [Field/target]
            Thread
        [Field/inverse]
            Thread/members
`;
