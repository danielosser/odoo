/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            cannedResponses
        [Field/model]
            Env
        [Field/type]
            o2m
        [Field/target]
            CannedResponse
`;
