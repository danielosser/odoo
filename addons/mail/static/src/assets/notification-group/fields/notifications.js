/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            notifications
        [Field/model]
            NotificationGroup
        [Field/type]
            o2m
        [Field/target]
            Notification
        [Field/inverse]
            Notification/notificationGroup
`;
