/** @odoo-module **/

import { Define } from '@mail/define';

export default Define`
    {Model}
        [Model/name]
            MessagingMenu
        [Model/fields]
            activeTabId
            counter
            isMobileNewMessageToggled
            isOpen
        [Model/id]
            MessagingMenu/messaging
        [Model/actions]
            MessagingMenu/close
            MessagingMenu/toggleMobileNewMessage
            MessagingMenu/toggleOpen
`;
