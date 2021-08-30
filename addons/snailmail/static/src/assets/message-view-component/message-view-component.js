/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {ModelAddon}
        [ModelAddon/feature]
            snailmail
        [ModelAddon/model]
            MessageViewComponent
        [ModelAddon/fields]
            hasSnailmailDialog
        [ModelAddon/template]
            root
                snailmailErrorDialog
            notificationFailure
                notificationIconSnailmail
        [ModelAddon/actionAddons]
            MessageViewComponent/_onClickNotificationIconFailure
`;
