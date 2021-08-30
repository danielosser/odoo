/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            activities
        [Field/model]
            ActivityType
        [Field/type]
            o2m
        [Field/target]
            Activity
        [Field/inverse]
            type
`;
