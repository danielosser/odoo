/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            sms
        [ModelAddon/model]
            MessageViewComponent
        [ModelAddon/template]
            notificationFailure
                notificationIconSms
                notificationLabelSms
`;
