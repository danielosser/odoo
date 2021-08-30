/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Dev/comment}
        Visitor connected to the livechat.
    {Field}
        [Field/name]
            visitor
        [Field/feature]
            website_livechat
        [Field/model]
            Thread
        [Field/type]
            m2o
        [Field/target]
            Visitor
        [Field/inverse]
            Visitor/threads
`;
