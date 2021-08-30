/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            notificationGroup
        [Field/model]
            NotificationGroupComponent
        [Field/type]
            m2o
        [Field/target]
            NotificationGroup
        [Field/isRequired]
            true
`;
