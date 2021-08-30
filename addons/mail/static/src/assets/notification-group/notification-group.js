/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            NotificationGroup
        [Model/fields]
            date
            notifications
            resId
            resModel
            resModelName
            sequence
            thread
            type
        [Model/id]
            NotificationGroup/res_model
            .{&}
                NotificationGroup/res_id
            .{&}
                NotificationGroup/notification_type
        [Model/actions]
            NotificationGroup/_openDocuments
            NotificationGroup/openCancelAction
            NotificationGroup/openDocuments
        [Model/onChanges]
            NotificationGroup/onChangeNotifications
`;
