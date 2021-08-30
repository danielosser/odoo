/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            partner
        [Field/model]
            Notification
        [Field/type]
            m2o
        [Field/target]
            Partner
`;
