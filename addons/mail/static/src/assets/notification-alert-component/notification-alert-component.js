/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            NotificationAlertComponent
        [Model/template]
            root
                text
        [Model/actions]
            NotificationAlertComponent/isNotificationBlocked
`;
