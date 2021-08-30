/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            NotificationPopoverComponent
        [Model/fields]
            notifications
        [Model/template]
            root
                notification
                    notificationIcon
                    notificationPartnerName
`;
