/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            Notification
        [Model/fields]
            failureType
            id
            isFailure
            isFromCurrentUser
            group
            message
            partner
            status
            type
        [Model/id]
            Notification/id
        [Model/actions]
            Notification/convertData
`;
