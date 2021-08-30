/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            NotificationListComponent
        [Model/fields]
            filter
            notifications
        [Model/template]
            root
                noConversation
                threadPreview
                threadNeedactionPreview
                group
                notificationRequest
                separator
        [Model/actions]
            NotificationListComponent/_getThreads
            NotificationListComponent/_loadPreviews
        [Model/lifecycles]
            onMounted
`;
