/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            isChannelTokenSecret
        [Field/model]
            DiscussPublicView
        [Field/type]
            attr
        [Field/target]
            Boolean
        [Field/default]
            true
`;
