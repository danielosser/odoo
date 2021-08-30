/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            visitor
        [Field/model]
            VisitorBannerComponent
        [Field/type]
            m2o
        [Field/target]
            Visitor
        [Field/isRequired]
            true
`;
