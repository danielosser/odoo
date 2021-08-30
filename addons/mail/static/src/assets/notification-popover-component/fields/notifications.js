/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            notifications
        [Field/model]
            NotificationPopoverComponent
        [Field/type]
            m2m
        [Field/target]
            Notification
        [Field/isRequired]
            true
`;
