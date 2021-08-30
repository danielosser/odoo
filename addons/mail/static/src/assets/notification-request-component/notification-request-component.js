/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            NotificationRequestComponent
        [Model/template]
            root
                sidebar
                    imageContainer
                        image
                        partnerImStatusIcon
                content
                    header
                        name
                    core
                        inlineText
        [Model/actions]
            NotificationRequestComponent/_handleResponseNotificationPermission
`;
