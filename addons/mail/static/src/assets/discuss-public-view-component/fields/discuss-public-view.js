/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            discussPublicView
        [Field/model]
            DiscussPublicViewComponent
        [Field/type]
            m2o
        [Field/target]
            DiscussPublicView
        [Field/isRequired]
            true
`;
