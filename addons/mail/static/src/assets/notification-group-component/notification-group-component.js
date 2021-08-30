/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            NotificationGroupComponent
        [Model/fields]
            notificationGroup
        [Model/template]
            root
                sidebar
                    imageContainer
                        image
                content
                    header
                        name
                        counter
                        headerAutogrowSeparator
                        date
                    core
                        inlineText
                        coreAutogrowSeparator
                        markAsRead
`;
