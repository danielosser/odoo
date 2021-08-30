/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Field}
        [Field/name]
            notificationHandler
        [Field/model]
            Env
        [Field/type]
            o2o
        [Field/target]
            MessagingNotificationHandler
        [Field/isCausal]
            true
        [Field/isReadonly]
            true
        [Field/default]
            {Record/insert}
                [Record/traits]
                    MessagingNotificationHandler
`;
